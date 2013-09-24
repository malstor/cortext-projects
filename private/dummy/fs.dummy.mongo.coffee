mongo 	= require 'mongodb'
Server 	= mongo.Server
Db 		= mongo.Db

server 	= new Server('localhost', 3002, {auto_reconnect: true});
db 		= new Db('meteor', server);

_		= require "underscore"
crypto  = require "crypto"
deferred= require 'deferred'

h 		= require "./helpers/date.js"
Element = require "./classes/element.coffee"
m 		= require "./classes/messages.coffee"

dataset =
	directory : "data"
	secret: '4b6be4b408195388def323740e7cc20053fa6f57f46faf57816a99ae2a257af2'
	projects :
		number: 15
		elements : 50
		timespan : 10
	messages :
		paragraphs : 3

m.ok "creating fake dataset"

projects = []
last_id = 0;

create_elements = (project_id) ->
	elements = []

	nb_elements = 4 + Math.floor( Math.random() * dataset.projects.elements)

	current_date = new Date().getTime()

	for i in [ 0..nb_elements]
		last_id += 1
		elements.push Element.new(last_id).random current_date, dataset 

	members = for e in elements
		member = 
			name: e.author.name
			id: e.author.id

	members = _.uniq members, false, (e)-> e.id
	
#	m.inspect members

	info =
		id: project_id
		title: "project #"+Math.floor( Math.random() * 6400000)
		date_created: current_date
		date_updated: current_date

	resp =
		info: info
		members: members
		elements: elements

projects.push create_elements(p) for p in [0..dataset.projects.number]

m.inspect dataset

authors = {}

add_users = (e,c)->
	for name, id in Element.names
		u =
			name: name
			id: id
			password: crypto.createHmac('sha256', dataset.secret).update("pikachu").digest('hex')
			date_created: new Date().getTime()
			email: "tk@deveha.com"

		c.insert u, {}, (err, object)->
			authors[u.name] = u

#	console.log authors

	m.ok "users inserted"

	db.createCollection "projects", add_projects
	db.createCollection "elements", add_elements

add_elements = (e,c)->
	for project, project_id in projects
		for element in project.elements
			element.project = project_id
			c.insert element
	m.ok "elements inserted"

	aggregate_projects()

add_projects = (e,c)->
	for project, project_id in projects
		p = project.info
		c.insert p

	m.ok "projects inserted"

aggregate_projects = (e, c)->

	map = ()->
		result =
			type : this.type
			count : 1

		emit this.project, result

	reduce = (project, rows)->
		sum = {}

		for row in rows
			sum[row.type] = sum[row.type] || 0
			sum[row.type] += row.count

		sum

	options =
		out:
			replace: "counter_projects_elements"

	db.collection "elements", (error, collection)->
		collection.mapReduce map, reduce, options, (error, results)->


	map = ()->
		emit this.project, this.author

	reduce = (project, rows)->
		members = []
		uniques = {}

		for row in rows
#			members.push row
			uniques[row] = 1

		for member,ok of uniques
			members.push parseInt(member)

		{ members }

	options =
		out:
			replace: "projects_membership"

	db.collection "elements", (error, collection)->
		collection.mapReduce map, reduce, options, (error, results)->
#			console.log error
#			console.log results

	m.ok "project consolidated"

db.open (err, db)->
	db.dropDatabase (e,d)->
		db.createCollection "members", add_users
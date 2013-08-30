#!/usr/bin/env node
fs		= require "fs"
yaml	= require "pyyaml"
_		= require "underscore"
crypto  = require "crypto"
deferred= require 'deferred'


h 		= require "./helpers/date.js"
Element = require "./classes/element.coffee"
m 		= require "./classes/messages.coffee"


dump	= deferred.promisify yaml.dump

dataset =
	directory : "data"
	secret: '4b6be4b408195388def323740e7cc20053fa6f57f46faf57816a99ae2a257af2'
	projects :
		number: 10
		elements : 40
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

dir = dataset.directory

# console.log("")
# console.log("## reset directory:")
# console.log("-------------------")
# fs.rmdir(dir)
# console.log("done")

try
	fs.mkdirSync dir
	fs.mkdirSync "#{dir}/projects"
	fs.mkdirSync "#{dir}/elements"
	fs.mkdirSync "#{dir}/analysis"
	fs.mkdirSync "#{dir}/users"
	fs.mkdirSync "#{dir}/images"
	fs.mkdirSync "#{dir}/messages"
	fs.mkdirSync "#{dir}/jobs"
catch error
	m.ko "creating data folder"
	process.exit()

m.ok "creating data folder"

proj_dir = dir+"/projects/"

for d in [0..dataset.projects.number]
#	console.log "project #{d}"
	yaml.dump projects[d], "#{proj_dir}/#{d}.yaml"

#	for e in projects[d].elements
	result = (r)->
		""

	process = (e)->
		type = String(e.type).toLowerCase()

		if(type != "analysis")
			type = type+"s"

		console.log "  storing element #{type} #{e.id}"
		dump e, "#{dir}/elements/#{e.id}.yaml"
		dump e, "#{dir}/#{type}/#{e.id}.yaml"

	deferred.map(projects[d].elements,process,null,2)(result)

	# 	async = _.after projects[d].elements.length, ()->

	# next = (i) ->
	# 	e = projects[d].elements[i]
	# 	type = String(e.type).toLowerCase()

	# 	if(type != "analysis")
	# 		type = type+"s"

	# 	console.log "  storing element #{type} #{e.id}"
	# 	yaml.dump e, "#{dir}/#{type}/#{e.id}.yaml", (err) ->
	# 		console.log "projects[d].elements.length"
	# 		console.log projects[d].elements.length
	# 		if(i+1 < projects[d].elements.length)
	# 			next i+1 

	# next 0

m.ok "store projects"

for name, id in Element.names
	u =
		name: name
		id: id
		password: crypto.createHmac('sha256', dataset.secret).update("pikachu").digest('hex')
		date_created: new Date().getTime()
		email: "tk@deveha.com"

	yaml.dump u, "#{dir}/users/#{id}.yaml"
m.ok "store users"

# m.stop()
# process.exit()
lorem 	= require('synergipsum')
h = require("../helpers/date.js")

types = [
    "Image"
    "Analysis"
    "Message"
]

names = [
	"Jean-Philippe Cointet"
	"Tam Kien Duong"
	"Chloé Duloquin"
	"Elise Tancoigne"
	"Marc Barbier"
	"Philippe Breucker"
]

class Element
	id: undefined
	type: 0
	author: ""
		# id: 0
		# name: ""
	date: ""
#	date_formated: ""

	constructor: (id)->
		@id = id
#		console.log @id

	random: (current_date, dataset) =>
		author =
			id: a_id = Math.floor(Math.random() * names.length)
			name: names[ a_id ]

#		@id				= @id || Math.floor Math.random() * 100
		@type 			= types[ Math.floor( Math.random() * 3) ]
		@author			= author.id
		@date 			= current_date
#		@date_formated	= h.format_date current_date

#		console.log "toto"

		switch @type
			when "Message"
				content = lorem.create Math.floor( Math.random() * dataset.messages.paragraphs) + 1
				@content = content.generate()
			when "Image"
				@url = "http://lorempixel.com/735/400/"

		this

module.exports.new = (id)-> new Element id

module.exports.names = names
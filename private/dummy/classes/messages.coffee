colors = require('colors')
util = require('util')

class messages
	type:
		ok: "ok".green
		ko: "ko".red

	constructor: ()->

	ok: (msg)->
		console.log "[ #{@type.ok} ] #{msg}"

	ko: (msg)->
		console.log "[ #{@type.ko} ] #{msg}"

	inspect: (object)->
		console.log util.inspect object, true, null, true

	stop: ()->


# charm = require('charm')({stdin:process.stdin, stdout:process.stdout});

# charm.on '^C', process.exit

# class messages
# 	pos:
# 		x: 0
# 		y: 0

# 	constructor: ()->
# 		@pos = { x: 0, y: 0 }

# 		# charm.pipe process.stdout
# 		charm.reset()

# 		this

# 	ok: (msg)->
# 		charm.position(0, @pos.y)
# 		charm.foreground("white").write("[    ]")
# 		charm.left(4).foreground("green").write("ok")
# 		charm.right(3).foreground("white").write(msg)
# 		charm.position @update_position
# 		@pos.y = @pos.y + 2

# 	update_position: (x,y)->
# 		c = this

# 		@ok x
# 		@ok y

# 		this

# 	position: (x,y)->
# 		charm.position x,y

# 	stop: ()->
# 		@position 0,@pos.y-1
# 		charm.end()

module.exports = new messages
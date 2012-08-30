servers.Route.augment({
	assets : {
		vendor : new mirror ([
	        require.resolve('../assets/js/lib/jquery.js'),
	        require.resolve('../node_modules/bones/node_modules/underscore'),
    	    require.resolve('../node_modules/bones/node_modules/backbone')
		], { type: '.js' })
	}
});
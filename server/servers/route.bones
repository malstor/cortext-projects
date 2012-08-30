servers.Route.augment({
	assets : {
		vendor : new mirror ([
	        require.resolve('../assets/js/lib/jquery.js'),
	        require.resolve('../node_modules/bones/node_modules/underscore'),
    	    require.resolve('../node_modules/bones/node_modules/backbone')
		], { type: '.js' })
	}
});

servers.Route.prototype.assets.all = new mirror([
    servers.Route.prototype.assets.vendor,
    servers.Route.prototype.assets.core,
    servers.Route.prototype.assets.routers,
    servers.Route.prototype.assets.models,
    servers.Route.prototype.assets.views,
    servers.Route.prototype.assets.templates
], { type: '.js' });
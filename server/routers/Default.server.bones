var time = Date.now();

routers.Default.prototype.send = function(view, options) {
    // console.log('session:');
    // console.log(this.req.session);
    // pas sûr que ce soit très kasher ...
    session = this.req.session;
    request = this.req;

    console.log(request.query);

    var options = arguments.length > 1 ? arguments[1] : {};

    // Execute the main view.
    var main = new view(options);
    main.render();

 //   console.log(options.model.constructor.title);

    // Provide all models with the data that well be used to prop them back up
    // on the browser.
    var o = '{el: $("#main"),';
    _.each(options, function(v, k) {
        // Any options that is a model or collection will have it's title
        // declared. Use this to re-hydrate it.
        if (v.constructor.title != undefined) {
            o += JSON.stringify(k) + ': new models.'+ v.constructor.title +'('+ JSON.stringify(options[k]) + '),';
        } else {
            o += JSON.stringify(k) + ':' + JSON.stringify(options[k]) +',';
        }
    });
    o = o.replace(/,$/, '}');

    var current_user = {};

    if (session && session.user){
        current_user = session.user.toJSON();
    }

    // Finally send the page to the client.
    this.res.send(Bones.plugin.templates.App({
        version: time,
        title: this.pageTitle(main),
        main: $(main.el).html(),
        path: this.path(options.model),
        startup: 'current_user = '+ JSON.stringify(current_user) +';'
    }));
};


routers.Default.prototype.user_projects = function(user_id){
    console.log("api>");
    var router = this;

    var u = new models.user({ id : user_id });

    u.fetch_projects(function(){
        router.res.send(u.projects.toJSON());
    });

    console.log("<api");
}
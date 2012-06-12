server = Bones.Server.extend({ model : models.user });

// servers.Middleware.augment({
//     initialize: function(parent, app) {
//         parent.call(this, app);
// 		console.log("hum");
//         this.use(new servers.Auth(app, { model : models.user }));
//  //       console.log(app);
//     }
// });
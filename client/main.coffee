Meteor.startup ()->
  Collections.init()
  @app = new App()
  Backbone.history.start({pushState: true})
  @app.start()
  console.log "app started"
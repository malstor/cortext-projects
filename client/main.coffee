Meteor.startup ()->
  Collections.init()
  @app = new App()

  Backbone.history.start({pushState: true})
  
  console.log "app started"
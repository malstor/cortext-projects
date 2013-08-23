Meteor.startup ()->
  new App()
  Backbone.history.start({pushState: true})

  console.log "start"
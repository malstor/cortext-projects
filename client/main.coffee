Meteor.startup ()->
  Collections.init();
  new App()
  Backbone.history.start({pushState: true})

  console.log "start"
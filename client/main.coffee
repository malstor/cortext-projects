Meteor.startup ()->
  Collections.init()

  @app = new App()
  Backbone.history.start({pushState: true})
  

  # Deps.autorun ()=>
  #   if Meteor.user() or demo
  #     console.log "let's roll !"
  #   else
  #     @app.navigate('/login')   
  #     console.log 'logging in...'
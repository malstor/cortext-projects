@login = Backbone.View.extend
    events:
        "click #distante .login" : "loginWithCortext"
        "click .inscription" : "subscribe"

    render: ()=>
      if(@demo)
        app.navigate('/dashboard')
      else
        $('#header').hide()
        $('#main').html Template.login()


    loginWithCortext: ()->
        Meteor.subscribe "members"
        Meteor.loginWithCortext (error)->
            if(error)               
              console.log 'login error', error
            else
              route = "/dashboard" #todo redirect to the asked route
              console.log "logged !", Meteor.user()
              Collections.updateCurrentUser(Meteor.userId())
              app.user_id =  parseInt(Meteor.user().profile.id)
              $('#header').show()
              app.navigate(route,{trigger: true})
    
    subscribe: ()->
        window.location = dashboardConfig.services.Identity.urlSubscribe

    
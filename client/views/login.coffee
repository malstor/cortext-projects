@login = Backbone.View.extend
    events:
        "click #distante .login" : "loginWithCortext"
        "click .inscription" : "subscribe"
    initialize: ()=>
      if(@demo)
        app.navigate('/dashboard')

    render: ()->
      $('#header').hide()
      
      Template.welcome.registered = ()=>
        @options.registered

      UI.insert UI.render(Template.login), $('#main').get(0)
      
      $('#first-usage').show()


    loginWithCortext: ()->
        Meteor.subscribe "members"
        Meteor.loginWithCortext (error)->
            if(error)               
              console.log 'login error', error
              #alert 'Error in login attempt !'
            else
              route = "/dashboard" #todo redirect to the asked route
              #console.log "logged !", Meteor.user()              
              if(Meteor.user())
                res = Meteor.call('updateProfile');
                if(Collections.updateCurrentUser)
                  Collections.updateCurrentUser(Meteor.user()._id)
                app.user_id =  parseInt(Meteor.user().profile.id)
                $('#header').show()
                app.navigate(route,{trigger: true})
    
    subscribe: ()->
        window.location = dashboardConfig.services.Identity.urlSubscribe+"?callback="+dashboardConfig.common.callback+'/login/1'

    
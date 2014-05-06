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
        
        $('#first-usage').show()


    loginWithCortext: ()->
        Meteor.subscribe "members"
        Meteor.loginWithCortext (error)->
            if(error)               
              console.log 'login error', error
              #alert 'Error in login attempt !'
            else
              route = "/dashboard" #todo redirect to the asked route
              console.log "logged !", Meteor.user()              
              if(Meteor.user())
                res = Meteor.call('updateProfile');
                Collections.updateCurrentUser(Meteor.userId())
                app.user_id =  parseInt(Meteor.user().profile.id)
                $('#header').show()
                app.navigate(route,{trigger: true})
    
    subscribe: ()->
        window.location = dashboardConfig.services.Identity.urlSubscribe+"?callback="+dashboardConfig.common.callback

    
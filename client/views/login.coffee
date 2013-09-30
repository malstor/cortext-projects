@login = Backbone.View.extend
    
    initialize: ()->

    events:
        "click .login" : "loginWithCortext"
        "click .inscription" : "subscribe"

    render: ()->
        $('#main').html Template.login

    loginWithCortext: ()->
        Meteor.loginWithCortext (e)->
            if(e)               
              console.log('login error', e);
            else
                console.log "logged !", Meteor.user()                
                App.navigate '/dashboard'
        

    subscribe: ()->
        window.location = dashboardConfig.services.Identity.urlSubscribe

    
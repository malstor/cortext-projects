@login = Backbone.View.extend
    
    initialize: ()->

    events:
        "click .login" : "loginWithCortext"
        "click .inscription" : "subscribe"


    render: ()->
        $('#main').html Template.login
        # $('.inscription').click ()=>
        #     @subscribe()
        # $('.login').click ()=>
        #     @loginWithCortext()
        console.log("login rendered")

    loginWithCortext: ()->
        Meteor.loginWithCortext()

    subscribe: ()->
        window.location = dashboardConfig.url.Subscribe

    
@login = Backbone.View.extend
    
    initialize: ()->

    events:
        "click .login" : "loginWithCortext"
        "click .inscription" : "subscribe"

    render: ()->
        $('#main').html Template.login

    loginWithCortext: ()->
        Meteor.loginWithCortext()

    subscribe: ()->
        window.location = dashboardConfig.url.Subscribe

    
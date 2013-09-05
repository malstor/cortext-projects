Meteor.startup ()->
    Accounts.loginServiceConfiguration.remove
      service: "cortext"

    Accounts.loginServiceConfiguration.insert
      service: "cortext"
      clientId: "cortext-dashboard"
      secret: "c0rt3xt"

    console.log "service configurations inserted"

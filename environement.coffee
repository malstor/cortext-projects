
# cortext projects - default settings object
# @author Philippe Breucker
# @copyright 2013

@Env = {}

@Env =
  initEnv : ()->
    dashboardConfig =
      url :
        Assets: "http://assets.dev"
        Manager: "http://ctmanager.dev"
        Auth: "http://oauth.dev/auth"
        Subscribe: "http://oauth.dev/user/register"
        Localhost: Meteor.absoluteUrl()
         
      params :
        refreshRate : 5000
  initAccounts : ()->
    Accounts.loginServiceConfiguration.remove
      service: "cortext"

    Accounts.loginServiceConfiguration.insert
      service: "cortext"
      clientId: "cortext-dashboard"
      secret: "c0rt3xt"

    console.log "service configurations inserted"

@dashboardConfig = Env.initEnv()
# console.log 'dashboardConfig : ', dashboardConfig
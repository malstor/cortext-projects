
# cortext projects - default settings object
# @author Philippe Breucker
# @copyright 2013

@Env = {}

@Env =
  init : ()->
    @initAccounts()

    dashboardConfig


  initAccounts : ()->
    if(dashboardConfig)
      console.log dashboardConfig
      if(dashboardConfig.services.Identity)
        Accounts.loginServiceConfiguration.remove
          service: dashboardConfig.services.Identity.account.service

        Accounts.loginServiceConfiguration.insert
          service: dashboardConfig.services.Identity.account.service,
          clientId: dashboardConfig.services.Identity.account.clientId,
          secret: dashboardConfig.services.Identity.account.secret

        console.log "service configurations inserted"
        dashboardConfig
    else
      null
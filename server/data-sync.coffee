@DataSync = {}

@DataSync =
    update : ->
      Collections.update()
    start : ->
      @updateInt = Meteor.setInterval @update, dashboardConfig.common.refreshRate

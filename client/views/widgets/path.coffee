@path = Backbone.View.extend
  set_as_fix: ()->
    $("#path ul .dashboard").css("paddingLeft", 107+"px")
    $("#path ul .home, #path ul .dashboard").unbind("mouseenter mouseleave")

  set_interactions: ()->
    offset = 107

    $("#path ul").css("left", "-"+(offset-$("#path ul li.home").innerWidth())+"px")
    $("#path ul li.home").css("left", (offset-$("#path ul li.home").innerWidth())+"px")

    $("#path ul .home, #path ul .dashboard").bind "mouseenter",(evt)->
      $("#path ul").animate
        paddingLeft: 107
      ,
        duration: 600
        queue: false

    $("#path ul .home, #path ul .dashboard").bind "mouseleave",(evt)->
      $("#path ul").animate
        paddingLeft: 0
      ,
        duration: 600
        queue: false

  set_title: ()->
    #console.log _.last @options.path
    if !(_.isUndefined _.last(@options.path))
      if !(_.isUndefined _.last(@options.path).name)
        document.title = _.last(@options.path).name + ' :: cortext'
    else
      document.title = "dashboard :: cortext"


  render: ()->
    UI.insert UI.renderWithData(Template.path, {path: @options.path}), $("#path").get(0)
    
    @set_interactions()
    @set_title()
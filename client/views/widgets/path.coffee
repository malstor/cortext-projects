@path = Backbone.View.extend
  render: ()->
    $("#path").html Template.path
      path: @options.path

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
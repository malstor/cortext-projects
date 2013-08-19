@path = Backbone.View.extend
  render: ()->
    $("#path").html Template.path
      path: @options.path
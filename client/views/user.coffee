@user = Backbone.View.extend
  render: ()->
    $("#main").html Template.user
      user: @options.user
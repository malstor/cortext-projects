@user_infos = Backbone.View.extend
  render: ()->
    #console.log 'rendering user ', @options.user
    $("#user").html Template.user_infos
      user: @options.user.attributes

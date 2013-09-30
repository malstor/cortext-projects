@user_infos = Backbone.View.extend
  render: ()->
       $("#user").html Template.user_infos
        user: @options.user.attributes

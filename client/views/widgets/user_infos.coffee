@user_infos = Backbone.View.extend
  render: (user)->
        $("#user").html Template.user_infos
            current: user
   

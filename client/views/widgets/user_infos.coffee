@user_infos = Backbone.View.extend
  render: ()->
    #console.log 'rendering user ', @options.user
    UI.insert UI.renderWithData(Template.user_infos, user: @options.user.attributes), $("#user").get(0)
      

@element = Backbone.View.extend
  render: ()->
    UI.insert UI.render(Template.element), $("#main").get(0)
    
    element = @options.element.attributes
    
    UI.insert UI.renderWithData(Template[element.type.toLowerCase()], e: element), $("#element-content").get(0)
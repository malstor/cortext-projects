@element = Backbone.View.extend
  render: ()->
    UI.insert UI.render(Template.element), $("#main").get(0)
    
    element = @options.element.attributes

    $("#element-content").html Template[element.type.toLowerCase()] element
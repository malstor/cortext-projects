@element = Backbone.View.extend
  render: ()->
    $("#main").html Template.element

    element = @options.element.attributes

    $("#element-content").html Template[element.type.toLowerCase()] element
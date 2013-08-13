spare_project =
  id: "0000"
  title: "un faux projet"

spare_elements =
  1:
    type: "image"
    title: "une fausse image"
  2:
    type: "analysis"
    title: "une fausse analyse"
  3:
    type: "message"
    title: "un faux message"

@project_list = Backbone.View.extend
  init: ()->

  render: ()->
    elements = []

    _(spare_elements).each (e, k)->
      e.id = k
      elements.push e

    @$el.html Template.dashboard_list_project
      project: spare_project
      elements: elements

# @project_element = Backbone.View.extend
#   render: ()->
#     console.log @options.element
#     $('#dashboard .projects-list').append @options.element.type
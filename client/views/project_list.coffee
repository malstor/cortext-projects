Meteor.subscribe "projects"
Meteor.subscribe "elements"


@project_list_simple = Backbone.View.extend
  render: ()->
    Deps.autorun ()=>
      @$el.empty()

      _(projects.find({}).fetch()).each (project)=>
        @$el.append Template.project_simple
          p: project

@project_list_with_elements = Backbone.View.extend
  render_composition: (project_id, elements)->

    reduce = (m, type)->
      if m[type] >= 0
        m[type] = m[type] + 1
      else
        m[type] = 0

      m

    composition = _(_(elements).map (e)-> e.type ).reduce reduce, {}

    $("#project-"+project_id+" .participation").empty()
 
    new participation
      el : "#project-"+project_id+" .participation"
      composition: composition
    .render()


  render_elements: (project_id)->
    Deps.autorun ()=>
      project_elements = elements.find({ project : project_id }).fetch()

      @render_composition project_id, project_elements

      $("#project-"+project_id+" .elements").empty()

      _(project_elements).each (element)=>
        $("#project-"+project_id+" .elements").append(Template.dashboard_project_element({ element: element }))        

  render: ()->
    Deps.autorun ()=>
      _(projects.find({}).fetch()).each (project)=>

        @$el.append Template.dashboard_list_project
          project: project
          composition: []

        @render_elements project.id

# @project_element = Backbone.View.extend
#   render: ()->
#     console.log @options.element
#     $('#dashboard .projects-list').append @options.element.type
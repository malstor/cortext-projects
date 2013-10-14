Meteor.subscribe "projects"

@project_list_simple = Backbone.View.extend
  render_item: (project_id)->
    p = new models.project()

    p.on "project:loaded", ()=>
      t = Template.project_simple
        p: p.attributes
        members: p.members

      @$el.find('.project-'+project_id).remove()
      @$el.append t

    p.on "project:elements:changed", ()=>
      $("#project-"+project_id+" .participation").empty()

      new participation
         el: '#projects-simple .project-'+project_id+' .participation'
         composition: p.composition
      .render()

    p.get_by_id(project_id)

  render: ()->
    Deps.autorun ()=>
      @$el.empty()
      if Meteor.userId()
        _(projects.find({}).fetch()).each (project)=>
          @render_item project.id

@project_list_with_elements = Backbone.View.extend
  render_project: (project_id)->
    p = new models.project()

    p.on "project:loaded", ()=>
      @$el.append Template.dashboard_list_project
        project: p.attributes
        composition: []
      @render_elements p
      @render_composition p

    p.on "project:elements:changed", ()=>
      @render_elements p
      @render_composition p

    p.get_by_id project_id

  render_composition: (project)->
    project_id = project.attributes.id
    composition = project.composition

    $("#project-"+project_id+" .participation").empty()
 
    new participation
      el : "#project-"+project_id+" .participation"
      composition: composition
    .render()

  render_elements: (project)->
    project_id = project.attributes.id
    project_elements = project.elements
    return if _.isUndefined $("#project-"+project_id+" .elements").html()
    $("#project-"+project_id+" .elements").empty()

    _(project_elements).each (element)=>
      member = members.findOne({ id: element.author })
      if member
        elt = Template[element.type.toLowerCase()]
          author : member
          e : element
        $("#project-"+project_id+" .elements").append elt

  render: ()->
    Deps.autorun ()=>
      _(projects.find({}).fetch()).each (project)=>
        @render_project project.id



# @project_element = Backbone.View.extend
#   render: ()->
#     console.log @options.element
#     $('#dashboard .projects-list').append @options.element.type
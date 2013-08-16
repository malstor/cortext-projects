Meteor.subscribe "projects"

@project_list_simple = Backbone.View.extend
  render_item: (project_id)->
    Meteor.subscribe "project", project_id

    Deps.autorun ()=>
      p = projects.findOne({ id: project_id })
      p_e = elements.find({ project: project_id }).fetch()
      p_m = _(_(p_e).pluck("author")).uniq()

      t = Template.project_simple
        p: p
        members: p_m

      @$el.find('.project-'+project_id).remove()
      @$el.append t

      reduce = (m, type)->
        m[type] = if m[type] is undefined then 0 else m[type] + 1
        m

      composition = _(_(p_e).map (e)-> if e.author == 0 then e.type else "Others" ).reduce reduce, {}

      $("#project-"+project_id+" .participation").empty()

      new participation
         el: '#projects-simple .project-'+project_id+' .participation'
         composition: composition
      .render()

  render: ()->
    Deps.autorun ()=>
      @$el.empty()

      _(projects.find({}).fetch()).each (project)=>
        @render_item project.id

@project_list_with_elements = Backbone.View.extend
  render_project: (project_id)->
    Meteor.subscribe "project", project_id

    Deps.autorun ()=>
      p = projects.findOne({ id: project_id })

      @$el.append Template.dashboard_list_project
        project: p
        composition: []

      @render_elements p.id

  render_composition: (project_id, elements)->
    reduce = (m, type)->
      m[type] = if m[type] is undefined then 0 else m[type] + 1
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
        member = members.findOne({ id: element.author })
        if member
          element.author = member
          $("#project-"+project_id+" .elements").append Template[element.type.toLowerCase()](element)

  render: ()->
    Deps.autorun ()=>
      _(projects.find({}).fetch()).each (project)=>
        @render_project project.id



# @project_element = Backbone.View.extend
#   render: ()->
#     console.log @options.element
#     $('#dashboard .projects-list').append @options.element.type
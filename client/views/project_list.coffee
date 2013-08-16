Meteor.subscribe "projects"

@project_list_simple = Backbone.View.extend
  render_item: (project_id)->
    Meteor.subscribe "project", project_id

    Deps.autorun ()=>
      p = projects.findOne({ id: project_id })

      t = Template.project_simple
        p: p

      @$el.append t

      p_e = elements.find({ project: project_id }).fetch()

      reduce = (m, type)->
        if m[type] >= 0
          m[type] = m[type] + 1
        else
          m[type] = 0

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
        member = members.findOne({ id: element.author })
        if member
          $("#project-"+project_id+" .elements").append(Template.dashboard_project_element({ element: element, author: member }))        

  render: ()->
    Deps.autorun ()=>
      _(projects.find({}).fetch()).each (project)=>
        @render_project project.id



# @project_element = Backbone.View.extend
#   render: ()->
#     console.log @options.element
#     $('#dashboard .projects-list').append @options.element.type
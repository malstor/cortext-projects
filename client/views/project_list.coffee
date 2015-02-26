Meteor.subscribe "projects"

@project_list_simple = Backbone.View.extend
  render_item: (project_id)->
    p = new models.project()

    p.on "project:loaded", ()=>
      t = UI.renderWithData(Template.project_simple,
        p: p.attributes
        members: p.members
        )

      @$el.find('.project-'+project_id).remove()
      @$el.append t
      @render_composition(p)

    p.on "project:elements:changed", ()=>
      @render_composition(p)

    p.get_by_id(project_id)

  render_composition: (p)->
    $("#project-simple .project-"+p.id+" .participation").empty()
    # console.log 'rendering composition', p.composition
    new participation
       el: '#projects-simple .project-'+p.id+' .participation'
       composition: p.composition
    .render()

  render: ()->
    Deps.autorun ()=>
      @$el.empty()
      if Meteor.userId()
        _(projects.find({members: parseInt(app.user_id)}, sort: {archive: 1, date_created: -1}).fetch()).each (project)=>
          @render_item project.id

@project_list_with_elements = Backbone.View.extend
  render_project: (project)->
    p = project
    project_id = p.get('id')

    p.on "project:loaded", ()=>
      #console.log p.attributes
      @$el.find('#project-'+p.get('id')).remove()
      @$el.append UI.renderWithData(Template.dashboard_list_project,
        project: p.attributes
        composition: []
        )
      @render_elements p
      @render_composition p

      $('a.delete').on "click", (evt)=>
        evt.preventDefault()
        evt.stopImmediatePropagation()
        #console.log "archiving #",p.id
        p.archive()
        @$el.find('#project-'+p.get('id')).remove()

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
      m = new models.member()
      m.get_by_id(element.author)
      m.set_gravatar()
      #console.log 'member', m
      if m
        elt = UI.renderWithData(Template[element.type.toLowerCase()],
          author : m.attributes
          e : element
        )
        $("#project-"+project_id+" .elements").append elt
        #console.log "render", @options
        # $(".results a").on "click", (evt) ->
        #   evt.preventDefault()
        #   console.log("results"+@.attr('rel'))


  render: ()->
    Deps.autorun ()=>
      Meteor.subscribe("projects")
      userProjects = projects.find {members : parseInt(app.user_id), archive: {$ne:true}}, sort: {date_created : -1}

      # if userProjects.count() == 0
      #   $("#first-usage").show()
      # else
      #   $("#first-usage").hide()
      _(userProjects.fetch()).each (project)=>
        #console.log 'loading project ', project.id
        p = new models.project()
        p.get_by_id project.id
        @render_project p




# @project_element = Backbone.View.extend
#   render: ()->
#     console.log @options.element
#     $('#dashboard .projects-list').append @options.element.type
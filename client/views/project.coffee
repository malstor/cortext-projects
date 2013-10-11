@project = Backbone.View.extend
  initialize: ()->

  render_elements: (project)->
    _(project.elements).each (e)=>
      # @$el.find("#elements").append e.author

      element = _(e).clone()
      element.author = members.findOne( { id: e.author } )

      $("#elements").append Template[ e.type.toLowerCase() ] element

  render_participants: (project)->
    $("#members .list").empty()

    _(project.members).each (m_id)=>
      m = members.findOne( { id: m_id })
      m.participation = project.get_participation m_id

      $("#members .list").append Template.project_participant m
      
      new participation
        el: $("#members .list .member-"+m_id+" .participation")
        composition: m.participation
      .render()

  render: ()->
    project = new models.project()

    project.on "project:loaded", ()->
      console.log 'rendering ', project
      $("#main").html Template.project 
        project: project.attributes
        composition: []

    project.on "project:elements:changed", ()=>
      @render_elements project
      @render_participants project

    project.get_by_id @options.project_id

    #@options.project.trigger('project:loaded')
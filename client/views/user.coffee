@user = Backbone.View.extend
  render_projects: ()->
    u = @options.user

    u.on "member:elements:changed", ()=>
      console.log u.projects

      $("#projects").html Template.user_projects
        projects: u.projects

      _(u.projects).each (project)=>
        p = new models.project()

        p.on "project:elements:changed", ()=>
          console.log "ouark", u.attributes.id

          new participation
            el: $("#projects .project-"+p.attributes.id+" .participation")
            composition: p.get_participation u.attributes.id
          .render()

        p.get_by_id project.id

  render_counter: ()->
    u = @options.user

    u.on "member:elements:changed", ()=>
      $("#indicator_projects .number").html _(u.projects).size()
      $("#indicator_analysis .number").html _(_(u.elements).where({ type : "Analysis" })).size()
      $("#indicator_documents .number").html _(_(u.elements).where({ type : "Image" })).size()
      $("#indicator_messages .number").html _(_(u.elements).where({ type : "Message" })).size()

  render: ()->
    $("#main").html Template.user
      user: @options.user.attributes

    @render_projects()
    @render_counter()
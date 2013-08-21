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

  render: ()->
    $("#main").html Template.user
      user: @options.user.attributes

    @render_projects()
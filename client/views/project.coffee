@project = Backbone.View.extend
  initialize: ()->
    Meteor.subscribe "project", parseInt(@options.project_id)

  render_elements: ()->
    Deps.autorun ()=>
      p_e = elements.find({ project:  parseInt(@options.project_id) }).fetch()

      console.log p_e

      _(p_e).each (e)=>
        # @$el.find("#elements").append e.author
        $("#elements").append Template[ e.type.toLowerCase() ] e

  render: ()->
    Deps.autorun ()=>
      project = projects.findOne({ id : parseInt(@options.project_id) })

      if project
        $("#main").html Template.project 
          project: project
          composition: []

        @render_elements()
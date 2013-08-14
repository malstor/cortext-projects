Meteor.subscribe "projects"

@project = Backbone.View.extend
  render: ()->
    console.log @options.project_id

    Deps.autorun ()=>
      project = projects.findOne({ id : parseInt(@options.project_id) })

      if project
        console.log project
        $("#main").html Template.project 
          project: project
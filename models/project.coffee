@models = {} if @models is undefined

@models.project = Backbone.Model.extend
  get_by_id: (project_id)->
    Meteor.subscribe "project", project_id

    Deps.autorun ()=>
      current = projects.findOne({ id: project_id })

      console.log project_id

      if current
        console.log "event"
        @set current
        @trigger "project:loaded"
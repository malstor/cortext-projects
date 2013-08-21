@models = {} if @models is undefined

@models.project = Backbone.Model.extend
  initialize: ()->
    @set_events()

  set_events: ()->
    Deps.autorun ()=>
      @elements = elements.find({ project: @attributes.id }).fetch()
      @members = _(_(@elements).pluck("author")).uniq()

      @trigger "project:elements:changed"    

  get_by_id: (project_id)->
    project_id = parseInt project_id

    Meteor.subscribe "project", project_id

    Deps.autorun ()=>
      current = projects.findOne({ id: project_id })

      if current
        @set current
        @set_events()
        @trigger "project:loaded"
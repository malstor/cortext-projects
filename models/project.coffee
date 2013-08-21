@models = {} if @models is undefined

@models.project = Backbone.Model.extend
  initialize: ()->
    @set_events()

  set_composition: ()->
    reduce = (m, type)->
      m[type] = if m[type] is undefined then 0 else m[type] + 1
      m

    @composition = _(_(@elements).map (e)-> e.type ).reduce reduce, {}
#    @composition = _(_(p.elements).map (e)-> if e.author == 0 then e.type else "Others" ).reduce reduce, {}

  set_events: ()->
    Deps.autorun ()=>
      @elements = elements.find({ project: @attributes.id }).fetch()
      @members = _(_(@elements).pluck("author")).uniq()

      @set_composition()

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
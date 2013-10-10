@models = {} if @models is undefined

@models.project = Backbone.Model.extend
  initialize: ()->
    @set_events()

  reduce_elements_to_composition: (m, type)->
    m[type] = if m[type] is undefined then 0 else m[type] + 1
    m

  set_composition: ()->
    @composition = _(_(@elements).map (e)-> e.type ).reduce @reduce_elements_to_composition, {}

  get_participation: (author_id)->
    author_id = parseInt author_id

    composition = _(_(@elements).map (e)->
      if e.author == author_id then e.type else "Others" ).reduce @reduce_elements_to_composition, {}

  set_events: ()->
    Deps.autorun ()=>
      @elements = elements.find({ project: @attributes.id }).fetch()

      _(@elements).each (e)=>
        e.permalink = "/element/#{e.type.toLowerCase()}/#{e.id}/in/#{@attributes.id}"

      @members = _(_(@elements).pluck("author")).uniq()

      @set_composition()

      @trigger "project:elements:changed"    

  get_by_id: (project_id)->
    console.log 'get project ', project_id
    project_id = parseInt project_id

    Meteor.subscribe "project", project_id

    Deps.autorun ()=>
      current = projects.findOne({ id: project_id })

      if current
        @set current
        @set_events()
        @trigger "project:loaded"

  save: ->
    date_current = moment().format('YYYY-MM-DD hh:mm:ss')
    projects.insert 
      title: @attributes.title
      date_created : date_current
      date_updated : date_current
      , (error, id)=>
        if(error)
          console.log 'error inserting project : ', error

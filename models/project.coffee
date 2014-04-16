@models = {} if @models is undefined

@models.project = Backbone.Model.extend

  set_permalink: ()->
      @set permalink: '/project/' + encodeURIComponent @get 'id'

  reduce_elements_to_composition: (m, type)->
    m[type] = if m[type] is undefined then 1 else m[type] + 1
    m

  set_composition: ()->
    @composition = _(_(@elements).map (e)-> e.type ).reduce @reduce_elements_to_composition, {}

  get_participation: (author_id)->
    author_id = parseInt author_id

    composition = _(_(@elements).map (e)->      
      if e.author == author_id then e.type else "Others" ).reduce @reduce_elements_to_composition, {}    

  set_events: ()->
    Deps.autorun ()=>
      @elements = elements.find({ project: @attributes.id, $or: [{commentOn: {$exists: false}}, {commentOn : 0} ] } ).fetch()
      #console.log 'prj elements', @attributes, @elements
      @set_elements()

      @members = _(_(@elements).pluck("author")).uniq()
      @set_composition()
      @trigger "project:elements:changed" 

  set_elements: ()->
    _(@elements).each (e)=>
        @set_comments(e)
        if e.type != 'Document'
          e.permalink = "/element/#{e.type.toLowerCase()}/#{e.id}/in/#{@attributes.id}"


  set_comments : (e)->
    comments = elements.find({commentOn: e.id}).fetch()      
    #console.log "find comments : on ",e.id, comments  

    if(comments)
      _(comments).each (co)=>
        au = new models.member()
        au.get_by_id(co.author)
        au.set_gravatar()
        co.author = au.attributes
      e.comments = comments


  get_by_id: (project_id)->
    project_id = parseInt project_id

    Meteor.subscribe "project", project_id

    Deps.autorun ()=>
      current = projects.findOne({ id: project_id })
      if current
        @set current
        @set_events()
        @trigger "project:loaded"

  propose_members: (options)->
    p_id = @attributes.id
    p_members = projects.findOne {id: p_id}, fields: {members: 1}
    p_members = p_members.members
    query = '.*'+options.query+'.*'
    u_list = members.find(id: {$nin:p_members}, $or: [name: {$regex: query, $options: 'i'}, email:{$regex: query, $options: 'i'}] ).fetch()

    if u_list
      options.success(u_list)
    else
      console.log('error retrieving potiential project members')


  
  add_member: (u_id)->
    p = projects.findOne({id: @attributes.id})
    if(p)
      projects.update p._id, $addToSet: {members: u_id}
  remove_member: (u_id)->
    p = projects.findOne({id: @attributes.id})
    if(p)
      projects.update p._id, $pull: {members: u_id}

  create: (options)->
    date_current = moment().format('YYYY-MM-DD hh:mm:ss')
    lastproj = projects.findOne {}, fields: {id: 1}, sort: {id : -1}
    next_id = if(lastproj) then parseInt(lastproj.id+1) else 1

    projects.insert 
      id: next_id
      title: @attributes.title
      date_created : date_current
      date_updated : date_current
      members : [options.user_id]
      , (error, id)=>
        if(error)
          console.log 'error inserting project : ', error
          options.error(error)
        if(id)
          @set id:next_id
          @set_permalink()          
          options.success(id)

  archive: () ->
    p = projects.findOne({id: @attributes.id})
    if(p)
      projects.update p._id, {$set: {archive: true}}

  searchElements: (searchString) ->
    searchReg = new RegExp(searchString.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"))
    @elements = elements.find({ 
      project: @attributes.id, 
      $or: 
        [
          {'name'                   : searchReg},
          {'content'                : searchReg},
          {'content.results.title'  : searchReg}, 
          {'parameters.script_name' : searchReg},
          {'parameters.jobUserName' : searchReg}, 
          {'parameters.corpus'      : searchReg},
          {'parameters.corpus_name' : searchReg}
        ] 
      }).fetch()

    @set_elements()

    @trigger "project:elements:changed"


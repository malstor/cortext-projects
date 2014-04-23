@models = {} if @models is undefined

@models.element = Backbone.Model.extend
  get_by_id: (element_id)->
    element_id = parseInt element_id

    Meteor.subscribe "element", element_id

    Deps.autorun ()=>
      current = elements.findOne({ id: element_id })

      if current
        @set current
        comments = elements.find({commentOn: element_id}).fetch()      
        #console.log "find comments : on ",current , comments  

        if(comments)
          _(comments).each (co)=>
            au = new models.member()
            au.get_by_id(co.author)
            au.set_gravatar()
            co.author = au.attributes
          @set 'comments', comments
        @trigger "element:loaded"

  create: (options)->
    lastelmt = elements.findOne {}, fields: {id: 1}, sort: {id : -1}
    next_id = if(lastelmt) then parseInt(lastelmt.id+1) else 1
    @set 'id', next_id
    
    elements.insert @attributes, (error, id)=>
      if(error)
        options.error()
      if(id)
        console.log 'calling success ', @id
        options.success(@id)

  remove_result: (result_id)->
      #find all elements that referenced the file
      elem_with_result = elements.find('content.results.id':result_id).fetch()
      _(elem_with_result).each (e)=>
        elements.update e._id, $pull: {'content.results':{id: result_id}} 
        console.log "result removed : ", result_id

  delete: (element_id)->
    comments = elements.find({commentOn: element_id}).fetch()
    _(comments).each (e)->
      elements.remove e._id
      console.log 'removing comment #'+e.id

    elm = elements.findOne({id: parseInt(element_id)})
    if(elm)
      elements.remove elm._id
      console.log "element removed : ", element_id
    else 
      console.log 'no element found : ', element_id





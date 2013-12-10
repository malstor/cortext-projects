@models = {} if @models is undefined

@models.element = Backbone.Model.extend
  get_by_id: (element_id)->
    element_id = parseInt element_id

    Meteor.subscribe "element", element_id

    Deps.autorun ()=>
      current = elements.findOne({ id: element_id })

      if current
        @set current
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




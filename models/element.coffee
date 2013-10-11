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
    elements.insert @attributes, (error, id)->
      if(error)
        options.error()
      if(id)
        options.success(id)




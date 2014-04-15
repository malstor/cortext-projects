@models = {} if @models is undefined

@models.member = Backbone.Model.extend
  get_by_id: (user_id)->
    #console.log 'member.get_by_id : ', user_id
    user_id = parseInt user_id

    Meteor.subscribe "member", user_id

    Deps.autorun ()=>
      current = members.findOne({ id: user_id })

      if current
        @set current
        @set_gravatar()
        
        @trigger "member:loaded"
        #console.log('member:loaded triggered', current)

    Deps.autorun ()=>
      @elements = elements.find({ author: user_id}).fetch()
      @projects = projects.find({ members: user_id}).fetch()

      @trigger "member:elements:changed"
      #console.log('member:elements:changed triggered', @elements)

    #console.log 'member deps set'

  set_gravatar: ()->
    if(@.get("email"))
      @set
        gravatar : 'http://www.gravatar.com/avatar/' + models.helpers.md5(@.get("email"))
    else
      @set
        gravatar : ''

@models = {} if @models is undefined

@models.member = Backbone.Model.extend
  get_by_id: (user_id)->
    Meteor.subscribe "member", user_id

    Deps.autorun ()=>
      current = members.findOne({ id: user_id })

      if current
        console.log "event"
        @set current
        @set_gravatar()
        @trigger "member:loaded"

  set_gravatar: ()->
    @set
      gravatar : 'http://www.gravatar.com/avatar/' + models.helpers.md5(@.get("email"))
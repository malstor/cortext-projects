@models = {} if @models is undefined

@models.member = Backbone.Model.extend
  get_by_id: (user_id)->
    user_id = parseInt user_id

    Meteor.subscribe "member", user_id

    Deps.autorun ()=>
      current = Meteor.users.findOne({ _id : user_id })
      
      if current
        current.id = current.services.cortext.id
        current.email = current.profile.email
        current.name = current.profile.name
        @set current
        @set_gravatar()
        @trigger "member:loaded"

    Deps.autorun ()=>
      @elements = elements.find({ author: user_id}).fetch()
      @projects = projects.find({ id: {$in: _(_(@elements).pluck("project")).uniq() }}).fetch()

      @trigger "member:elements:changed"

  set_gravatar: ()->
    @set
      gravatar : 'http://www.gravatar.com/avatar/' + models.helpers.md5(@.get("email"))
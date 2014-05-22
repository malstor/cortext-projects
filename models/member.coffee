@models = {} if @models is undefined

@models.member = Backbone.Model.extend
  get_by_id: (user_id)->
    #console.log 'member.get_by_id : ', user_id
    user_id = parseInt user_id

    Meteor.subscribe "member", user_id, ()=>
      if(Session.get('user_updated') is undefined)
        @updateCurrentUser(Meteor.userId())

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

  updateCurrentUser : (mUser_id)=>
        #console.log 'updating user ', mUser_id
        mUser = Meteor.users.findOne(mUser_id)
        if(mUser)
          @user_id =parseInt(mUser.profile.id)
          if(Meteor.isServer)
              @user_token = mUser.services.cortext.accessToken
          #console.log 'user found : ', mUser
          if(members)
            m = members.findOne({id: user_id})
            #console.log 'searching member #',user_id
            if(m)
              # console.log "user updated : ", user_id          
              m = members.update(m._id, $set:{name: mUser.profile.name, email: mUser.profile.email})
            else
              # console.log "new member inserted : ", mUser
              m = members.insert({id: user_id, name: mUser.profile.name, email: mUser.profile.email})

            Session.set('user_updated', true)

  set_gravatar: ()->
    if(@.get("email"))
      @set
        gravatar : 'http://www.gravatar.com/avatar/' + models.helpers.md5(@.get("email")) + "?d=identicon"
    else
      @set
        gravatar : ''

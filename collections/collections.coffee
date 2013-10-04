@Collections = {}

@Collections =
    init : ()=>
        @demo = if(_.isUndefined(dashboardConfig.services.Identity)) then true else false
        #@demo = true;
        if(@demo)
            @projects = new Meteor.Collection 'demo_projects'
            @elements = new Meteor.Collection 'demo_elements'
            @members = new Meteor.Collection 'demo_members'
            @indicators = new Meteor.Collection 'demo_indicators'
            if Meteor.isClient
                Session.set('user_id',1);
            
        else
            @projects = new Meteor.Collection 'projects'
            @elements = new Meteor.Collection 'elements'
            @members = new Meteor.Collection 'members'
            @indicators = new Meteor.Collection 'indicators'

    update : ()->
        console.log 'udpating datas'
        @updateCurrentUser

    updateCurrentUser : ()=>
        console.log 'updating ', Meteor.user()
        mUser = Meteor.user()
        user_id = parseInt(mUser.profile.id)
       # console.log 'user found : ', mUser
        m = members.findOne({id: user_id})
        if(m)          
          m = members.update(m._id, $set:{name: mUser.profile.name, email: mUser.profile.email})
        else
          m = members.insert({id: user_id, name: mUser.profile.name, email: mUser.profile.email})

    updateUsers : ()->
        console.log 'udpate users'

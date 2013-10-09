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
        else
            @projects = new Meteor.Collection 'projects'
            @elements = new Meteor.Collection 'elements'
            @members = new Meteor.Collection 'members'
            @indicators = new Meteor.Collection 'indicators'

    update : (mUser_id)->
        if mUser_id
            console.log 'udpating datas'
            @updateCurrentUser(mUser_id)
            @updateUserJobs()
        else 
          false

    updateCurrentUser : (mUser_id)=>
        console.log 'updating user ', mUser_id
        mUser = Meteor.users.findOne(mUser_id)
        @user_id =parseInt(mUser.profile.id)
        if(Meteor.isServer)
            @user_token = mUser.services.cortext.accessToken
        #console.log 'user found : ', mUser
        m = members.findOne({id: user_id})
        if(m)          
          m = members.update(m._id, $set:{name: mUser.profile.name, email: mUser.profile.email})
        else
          m = members.insert({id: user_id, name: mUser.profile.name, email: mUser.profile.email})

    updateUsers : ()->
        #todo
        console.log 'udpate users'

    updateUserJobs : ()=>
        console.log 'update jobs for ', user_id 
        if @demo
            console.log 'demo mode detected : no updates'
            false

        urlJobs = dashboardConfig.services.Jobs.url+ "/api/" + user_token + "/jobs.json"

        Meteor.http.call "GET", urlJobs, (error, jobs) ->  
          if(error)
            console.log "error getting jobs : ", error
          if(_.isUndefined(@cachedJobs))
            @cachedJobs = ""
          console.log '...getting jobs datas... '
          #console.log 'jobs datas from '+urlJobs+' : ',jobs.data
          #console.log "[jobs] "+jobs.data.length+" job(s) found"
          #console.log "[jobs] "+@cachedJobs.length+" jobs in cache"
          #console.log "cached",JSON.stringify(@cachedJobs)
          #console.log "api call",JSON.stringify(jobs.data)
          console.log "[jobs] ---> No changes found, exiting"
          return  if cachedJobs is JSON.stringify(jobs.data)  unless _.isUndefined(@cachedJobs)
          @cachedJobs = JSON.stringify(jobs.data)
          
          #console.log('[jobs] new jobs found, updating collection');
          _.each jobs.data, (item, key, list) ->
            nbJobs = elements.find(jobid: item.id).count()
            newItem = 
                jobid : item.id
                name : item.label
                type : 'analysis'
                date: item.updated_at
                author : parseInt(item.user_id)

            if nbJobs is 0
              newId = elements.insert newItem
              console.log "[jobs] added new job : #" + newId #+" : ",item
            else              
              elements.update
                jobid: item.id
              , newItem
              console.log "[jobs] updated job : ", item.id

          # each job
          jobIds = _.pluck(jobs.data, "id")
          dashboardIds = _.pluck(elements.find(
            author: user_id
            type: 'analysis'
          ,
            fields:
              jobid: 1
          ).fetch(), "jobid")
          
          #console.log('assets jobs : ', jobIds + ' --- dashboard doc :',dashboardIds);
          jobsToRemove = _.difference(dashboardIds, jobIds)
          if _.size(jobsToRemove) > 0
            _(jobsToRemove).each (id) ->
              elements.remove jobid: id

            console.log " found jobs to remove : ", jobsToRemove
        # end meteor call






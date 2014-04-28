@Collections = {}

@Collections =
    init : ()=>
        @cachedJobs = ""
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
            #console.log 'udpating user datas'
            @updateCurrentUser(mUser_id)
        #console.log 'updating data'
        @updateJobs()

    updateCurrentUser : (mUser_id)=>
        console.log 'updating user ', mUser_id
        mUser = Meteor.users.findOne(mUser_id)
        if(mUser)
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

    updateJobs : ()=>
        if @demo
            console.log 'demo mode detected : no updates'
            false
        user_token = (if _.isUndefined(user_token) then "c8e70e817b8ccc2e96ff76e2bb0b31ac2c4eaea0" else user_token)
        urlJobs = dashboardConfig.services.Jobs.url+ "/api/" + user_token + "/jobs.json"

        Meteor.http.call "GET", urlJobs, (error, jobs) ->  
          if(error)
            console.log "error getting jobs : ", error
          if(_.isUndefined(@cachedJobs))
            @cachedJobs = ""
          #console.log '...getting jobs datas... '
          #console.log 'jobs datas from '+urlJobs+' : ',jobs.data
          #console.log "[jobs] "+jobs.data.length+" job(s) found"
          #console.log "[jobs] "+@cachedJobs.length+" jobs in cache"
          #console.log "cached",JSON.stringify(@cachedJobs)
          #console.log "api call",JSON.stringify(jobs.data)
          #console.log "[jobs] ---> No changes found, exiting"
          return  if cachedJobs is JSON.stringify(jobs.data)  unless _.isUndefined(@cachedJobs)
          @cachedJobs = JSON.stringify(jobs.data)
          
          #console.log('[jobs] new jobs found, updating collection');
          jobIds = new Array()
          _.each jobs.data, (item, key, list) ->
            jobId = parseInt(item.id)
            nbJobs = elements.find(id: jobId).count()
            if item.label is 'external'
              reg = item.script_path.match(/\/([^\/]*\..*)$/)
              label = reg[1]
            else
              label = item.label
            newItem = 
                id : jobId #@todo : replace by contextual id
                name : label
                type : 'Analysis'
                time: item.updated_at
                progress: parseInt(item.progress)
                author : parseInt(item.user_id)
                state : item.state

            if nbJobs is 0
              newId = elements.insert newItem
              console.log "[jobs] added new job : #" + newId #+" : ",item
            else              
              elements.update
                id: jobId
              , newItem
              console.log "[jobs] updated job : ", item.id
            jobIds.push(jobId)

          # each job
          #jobIds = _.pluck(jobs.data, "id")
          dashboardIds = _.pluck(elements.find(
            type: 'Analysis'
          ,
            fields:
              id: 1
          ).fetch(), "id")
          
          #console.log('assets jobs : ', jobIds + ' --- dashboard doc :',dashboardIds);
          jobsToRemove = _.difference(dashboardIds, jobIds)
          if _.size(jobsToRemove) > 0
            _(jobsToRemove).each (id) ->
              elements.remove id: id
              console.log " found jobs to remove : ", jobsToRemove
        # end meteor call






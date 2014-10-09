@App = Backbone.Router.extend
  routes:
    '':                     'home'
    'dashboard':            'dashboard'
    'user/:user_id':        'user'
    'user/subscribe':       'subscribe'
    'user/:user_id/update':          'userUpdate'
    'project/:project_id':  'project'
    'project/:project_id/uploadedCorpus&corpus_id=:corpus_id': 'uploadCorpus'
    'project/:project_id/uploadedCorpus': 'uploadCorpus'
#    'element/:element_id':  'element'
    'element/:type/:element/in/:project': 'element'
    'element/:type/:element': 'element'
    'job/:jobId/log/:project_id' : 'log'
    'login/:registered': 'login'
    'login': 'login'
    'logout': 'logout'
    'auth/oauth': 'oauth'

  initialize: (options) ->
    Meteor.subscribe "members"

    Deps.autorun( =>
      if(demo)
        @user_id = 1
      else
        if(Meteor.user() )
          @user_id = parseInt(Meteor.user().profile.id)
          @user_infos(@user_id)
          #console.log 'logged in :', Meteor.user()
        else
          if !Meteor.loggingIn()
            #console.log 'not logging in, displaying log in page'
            @login()
            @navigate('/login', true)
    )

  checkLogin : (callback) ->
    #console.log "checkLogin"
    Deps.autorun () =>
      if(demo)
        @user_id = 1
      else
        if(Meteor.user() )
          @user_id = parseInt(Meteor.user().profile.id)
          @user_infos(@user_id)
          #console.log 'logged in :', Meteor.user()
          $('#header').show()
          callback()
        else
          if !Meteor.loggingIn()
            #console.log 'not logging in, displaying log in page'
            @login()
            @navigate('/login', true)


  path: (path_elements, options) ->
    #console.log "path_elements",  path_elements
    p = new path
      path: path_elements
    p.render()
    if options.fix
      p.set_as_fix()

  user_infos: (user_id) ->
    if(user_id)
      #console.log("render user info", user_id)
      member = new models.member()
      member.on "member:loaded", () =>
        ui = new user_infos
          user: member
        ui.render()
      member.get_by_id user_id
  
  userUpdate: (user_id)->
    Meteor.call('updateProfile',true, ()=>
      new models.member()
      .updateCurrentUser(Meteor.userId())

      @navigate('/user/'+user_id, true)
    );
    
    


  home: () ->
    @dashboard()

  login: (registered) ->
    #console.log "registered",registered
    new login
      el: '#main'
      registered: registered
    .render()

  logout: () ->
    Meteor.logout ()->
      window.open dashboardConfig.services.Identity.urlLogout

  dashboard: () ->
    @checkLogin () =>
      d = new dashboard()
      d.render()

      @path [],
        fix: true

  user: (user_id) ->

    member = new models.member()

    member.on "member:loaded", () =>
      u = new user
        user: member
      #console.log 'route user : member:loaded triggered => u.render, member :', member
      u.render()
      @path [
        type: "user"
        url: "/"
        name: member.get("name")
      ]
      , fix: false

    console.log 'route user : member get_by_id ', user_id
    member.get_by_id user_id

  project: (project_id) ->
    @checkLogin ()=>
      m_project = new models.project()

      

      p = new project
        project: m_project

      p.render()

      m_project.on "project:loaded", () =>
        @path [
          type: "Project"
          name: m_project.get("title")
        ]
        , fix: false
        if !(m_project.isMember(project_id,@user_id))
          @navigate('/dashboard', true)
          return

      m_project.get_by_id project_id




  element: (type, element_id, project_id) ->
    model = new models.element()

    model.on "element:loaded", () =>
      e = new element
        element: model

      e.render()

    model.get_by_id element_id

  log: (jobId, project_id) ->
    window.location = dashboardConfig.services.Jobs.url + "/logs/"+jobId+"?callback_url="+encodeURIComponent(dashboardConfig.common.callback+"/project/" + project_id)

  uploadCorpus: (project_id, corpus_id) ->
     console.log('uploadedCorpus ', corpus_id, project_id)
     @checkLogin () =>
      if(corpus_id?)
        parameters =
          callback_url: dashboardConfig.services.Jobs.callback + '/project/' + project_id
          context:
            project_id: project_id
            callback_url: dashboardConfig.services.Jobs.callback + '/project/' + project_id
            callback_json: dashboardConfig.services.Api.url + "/project/"+project_id+"/analysis"
          accessToken: Meteor.user().profile.accessToken
          corpus_id: corpus_id
        #console.log $.param(parameters, true)
        window.location = dashboardConfig.services.Jobs.url + "/job/new?" + $.param(parameters)
      else
        @navigate('/project/'+project_id, true)



@App = Backbone.Router.extend
  routes:
    '':                     'home'
    'dashboard':            'dashboard'
    'user/:user_id':        'user'
    'user/subscribe':       'subscribe'
    'project/:project_id':  'project'
#    'element/:element_id':  'element'
    'element/:type/:element/in/:project': 'element'
    'element/:type/:element': 'element'
    'login': 'login'
    'auth/oauth': 'oauth'
  initialize: (options)->
    Meteor.subscribe "members"
    
    Deps.autorun( => 
      if(demo)
        @user_id = 1        
      else
        if(Meteor.user())
          @user_id = parseInt(Meteor.user().profile.id)
          @user_infos(@user_id)
          console.log 'logged in :', Meteor.user()
        else
          @navigate('/login')
          false
    )

  path: (path_elements, options)->
    #console.log "path_elements",  path_elements
    p = new path
      path: path_elements
    p.render()
    if options.fix
      p.set_as_fix()

  user_infos: (user_id)->
    if(user_id)
      #console.log("render user info", user_id)
      member = new models.member()
      member.on "member:loaded", ()=>
        ui = new user_infos
          user: member
        ui.render()
      member.get_by_id user_id
  
  home: ()->
    @dashboard()
    
  login: ()->
    new login
      el: '#main'
    .render()

  dashboard: ()->
    #console.log('dashboard - user ', @user_id)
    d = new dashboard()
    d.render()
    
    @path [],
      fix: true
    
  user: (user_id)->
    member = new models.member() 

    member.on "member:loaded", ()=>
      u = new user
        user: member
      #console.log 'route user : member:loaded triggered => u.render, member :', member
      u.render()
      @path [
        type: "user"
        url: "/"
        name: member.get("name")
      ]
      ,fix: false

    #console.log 'route user : member get_by_id ', user_id
    member.get_by_id user_id
    
  project: (project_id)->
    m_project = new models.project()

    p = new project
      project: m_project

    p.render()

    m_project.on "project:loaded", ()=>
      @path [
        type: "Project"
        name: m_project.get("title")
      ]
      , fix: false 

    m_project.get_by_id project_id


    

  element: (type, element_id, project_id)->

    console.log element_id

    model = new models.element()

    model.on "element:loaded", ()=>
      console.log model
 
      e = new element
        element: model

      e.render()

    model.get_by_id element_id
    
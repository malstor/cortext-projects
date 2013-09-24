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

  path: (path_elements, options)->
    console.log "path_elements",  path_elements
    p = new path
      path: path_elements
    p.render()
    if options.fix
      p.set_as_fix()

  user_infos: (user)->
    member = new models.member()
    u = member.get_by_id({user_id: Meteor.userId()})
    ui = new user_infos
      user: member
    ui.render()
  
  home: ()->
    if Meteor.userId()
      @user_infos()
      @dashboard()
    else
      @login()

  login: ()->
      new login
        el: '#main'
      .render()

  dashboard: ()->
    d = new dashboard()
    d.render()
    @path {},
      fix: true

  user: (user_id)->
    member = new models.member() 

    member.on "member:loaded", ()=>
      u = new user
        user: member
      u.render()

      @path [
        type: "user"
        url: "/"
        name: member.get("name")
      ]

    member.get_by_id user_id

  project: (project_id)->
    p = new project
      project_id: project_id

    model = new models.project()

    model.on "project:loaded", ()=>
      p.render()

      @path [
        type: "Project"
        name: model.get("title")
      ]

    model.get_by_id(project_id)

  element: (type, element_id, project_id)->

    console.log element_id

    model = new models.element()

    model.on "element:loaded", ()=>
      console.log model
 
      e = new element
        element: model

      e.render()

    model.get_by_id element_id
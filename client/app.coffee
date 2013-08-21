@App = Backbone.Router.extend
  routes:
    '':                     'dashboard'
    'dashboard':            'dashboard'
    'user/:user_id':        'user'
    'project/:project_id':  'project'
    'element/:element_id':  'element'

  path: (path_elements)->
    console.log "path_elements",  path_elements

    p = new path
      path: path_elements
    p.render()

  dashboard: ()->
    d = new dashboard()
    d.render()

    @path()

  user: (user_id)->
    user_id = parseInt user_id
    member = new models.member() 

    member.on "member:loaded", ()=>
      console.log member.attributes
      u = new user
        user: member.attributes
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
    p.render()

    model = new models.project()

    model.on "project:loaded", ()=>
      @path [
        type: "Project"
        name: model.get("title")
      ]

    model.get_by_id(project_id)

  element: (element_id)->
    e = new element()
    e.render()
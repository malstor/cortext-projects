@App = Backbone.Router.extend
  routes:
    '':                     'dashboard'
    'dashboard':            'dashboard'
    'user/:user_id':        'user'
    'project/:project_id':  'project'
    'element/:element_id':  'element'

  dashboard: ()->
    d = new dashboard()
    d.render()

  user: (user_id)->
    u = new user()
    u.render()

  project: (project_id)->
    p = new project
      project_id: project_id
    p.render()

  element: (element_id)->
    e = new element()
    e.render()
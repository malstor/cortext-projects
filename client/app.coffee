@App = Backbone.Router.extend
  routes:
    '': 'dashboard'
    '/dashboard': 'dashboard'

  dashboard: ()->
    d = new dashboard()
    d.render()
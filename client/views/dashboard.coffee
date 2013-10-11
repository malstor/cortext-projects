@dashboard = Backbone.View.extend
  render: ()->
    $('#main').html Template.dashboard

    new queued_scripts
      el: $('#queuedScripts')
    .render()

    new project_list_simple
      el: $('#projects-simple .projects')
    .render()

    new project_list_with_elements
      el: $('#timeline')
    .render()

    @setEvents()

  setEvents: ()->
    $("#project-new .new").on "click", (e) ->
      e.preventDefault()
      p = new models.project(title: $("#project-new input").val())
      console.log 'p = ', p
      id = p.create
        user_id: app.user_id
        success: (id)->
          window.location = p.get('permalink')
        error: (err)->
          console.log 'error while creating project ', err


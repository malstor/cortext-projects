@dashboard = Backbone.View.extend
  render: ()->
    $('#main').html Template.dashboard
    $('#main .new').on 'click', ->


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
      id = p.save()
      window.location = '/project/'+id


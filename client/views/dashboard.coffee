@dashboard = Backbone.View.extend
  render: ()->
    $('#main').html Template.dashboard

    new project_list_simple
      el: $('#projects-simple .projects')
    .render()

    new project_list_with_elements
      el: $('#timeline')
    .render()
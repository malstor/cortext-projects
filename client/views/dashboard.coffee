@dashboard = Backbone.View.extend
  render: ()->
    $('#main').html Template.dashboard

    new project_list
      el: $('#dashboard .projects-list')
    .render()
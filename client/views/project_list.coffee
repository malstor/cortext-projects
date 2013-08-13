Meteor.subscribe "projects"

@project_list = Backbone.View.extend
  render: ()->
    _(projects.find({}).fetch()).each (project)=>
      @$el.append Template.dashboard_list_project
        project: project
        #elements: elements

# @project_element = Backbone.View.extend
#   render: ()->
#     console.log @options.element
#     $('#dashboard .projects-list').append @options.element.type
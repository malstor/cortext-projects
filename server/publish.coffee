Meteor.publish 'projects', ()->
  projects.find({})

Meteor.publish 'elements', ()->
  elements.find({})
Meteor.publish 'projects', ()->
  projects.find({}) 

Meteor.publish 'project', (project_id)->
  p_e = elements.find( { project: project_id } ).fetch()
  
  p_m = _(p_e).pluck("author")
  p_m = _(p_m).uniq()

  result = [
    projects.find({ id : project_id }),
    elements.find({ project: project_id }),
    members.find({ id: {$in: p_m }})
  ]

  console.log result

  result

Meteor.publish 'elements', ()->
  elements.find({})

Meteor.publish 'members', ()->
  members.find({})
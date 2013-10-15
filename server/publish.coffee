Meteor.publish 'projects', ()->
  projects.find() 

Meteor.publish 'project', (project_id)->
  p_e = elements.find( { project: project_id } ).fetch()
  
  p_m = _(p_e).pluck("author")
  p_m = _(p_m).uniq()

  result = [
    projects.find({ id : project_id }),
    elements.find({ project: project_id }),
    members.find({ id: {$in: p_m }})
  ]

#  console.log result

  result

Meteor.publish 'elements', ()->
  elements.find({})

Meteor.publish 'element', (element_id)->
  elements.find({ id: element_id })


Meteor.publish 'members', ()->
  members.find({})

Meteor.publish 'member', (user_id)->
  u_e = elements.find({ author: user_id }).fetch()
  u_p = _(u_e).pluck("id")
  u_p = _(u_p).uniq()

  results = [
    members.find({ id: user_id }),
    elements.find({ author: user_id }),
    projects.find({ members: user_id})
  ]
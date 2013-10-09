Meteor.subscribe "elements"

@queued_scripts = Backbone.View.extend
  render_item: (script_id)->
    e = new models.element()

    e.on "script:loaded", ()=>
      t = Template.scripts
        scripts: e.attributes
       
      @$el.find('#script-'+script_id).remove()
      @$el.append t

    e.get_by_id(script_id)

  render: ()->
    Deps.autorun ()=>
      @$el.empty()
      if Meteor.userId()

        _(elements.find({type: 'analysis', author: Meteor.user().profile.id}).fetch()).each (script)=>
          @render_item script.jobid
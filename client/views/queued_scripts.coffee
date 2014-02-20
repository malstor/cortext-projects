Meteor.subscribe "elements"

@queued_scripts = Backbone.View.extend
  render_item: (script_id)->
    #console.log "[scripts] rendrering ", script_id

    e = new models.element()

    e.on "element:loaded", ()=>
      #console.log 'element : loaded ', e
      t = Template.script
        s: e.attributes   

      @$el.find('#script-'+script_id).remove()
      @$el.append t


    e.get_by_id(script_id)

  render: ()->
    Deps.autorun ()=>
      @$el.empty()
      if Meteor.user()
        #console.log 'refreshing scripts'
        if(@options.project)
          project = @options.project.attributes
          #console.log "display scripts for project", project
          _(elements.find({type: 'Analysis', author: {$in: project.members}, project: parseInt(project.id)}).fetch()).each (script)=>
            @render_item script.id
        else      
          _(elements.find({type: 'Analysis', author: parseInt(Meteor.user().profile.id)}).fetch()).each (script)=>
            @render_item script.id
         # console.log "render_item ", script.id
          

      @$el.find('span.progress-script').each ->
        t = parseInt $('div.queued-scripts').width()
        s = parseInt($(this).attr('data-progress') * t / 100)
        # console.log 'refreshing progress ', $(this)
        $(this).css "width", s + "px" #@todo remove the "+20" : just for demo...
            
        
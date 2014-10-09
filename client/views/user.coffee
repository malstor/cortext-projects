@user = Backbone.View.extend
  initialize: ()->
    #console.log 'user.initialize'

    @u = @options.user


  render_projects: ()->
    #console.log 'user.render_projects'

    u = @options.user

    u.on "member:elements:changed", ()=>
      #console.log 'user.on member:elements:changed -> listener render_projects'

      $("#projects").html Template.user_projects
        projects: u.projects

      _(u.projects).each (project)=>
        p = new models.project()

        p.on "project:elements:changed", ()=>

          new participation
            el: $("#projects .project-"+p.attributes.id+" .participation")
            composition: p.get_participation u.attributes.id
          .render()

        p.get_by_id project.id

  render_messages: ()->
    #console.log 'user.render_messages'

    u = @options.user

    u.on "member:elements:changed", ()=>
      #console.log 'user.on member:elements:changed -> listener render_messages'

      _(u.projects).each (p)=>
        p.messages = _(u.elements).where
          project: p.id
          type: "Message"

      u.projects = _(u.projects).filter (p)->
        _(p.messages).size() > 0

      $("#messages").html Template.user_messages
        projects: u.projects

  render_counter: ()->
    #console.log 'user.render_counter'

    u = @options.user

    u.on "member:elements:changed", ()=>

      #console.log 'user.on member:elements:changed -> listener render_counter'
      
      $("#indicator_projects .number").html _(u.projects).size()
      $("#indicator_analysis .number").html _(_(u.elements).where({ type : "Analysis" })).size()
      $("#indicator_documents .number").html _(_(u.elements).where({ type : "Document" })).size()
      $("#indicator_messages .number").html _(_(u.elements).where({ type : "Message" })).size()

  render_scripts: ()->
    new queued_scripts
      el: $('#queuedScripts')
    .render()

  render: ()->
    #console.log 'user.render'
    @u.set
      urlEdit : dashboardConfig.services.Identity.urlEdit+'/'+@u.id+'/edit?callback_url='+dashboardConfig.common.callback+"/user/"+@u.id+"/update"
      
    $("#main").html Template.user
      user: @options.user.attributes

    

    @render_counter()
    @render_projects()
    @render_messages()
    @render_scripts()
    @u.trigger('member:elements:changed') #@todo find why we have to trigger that manualy
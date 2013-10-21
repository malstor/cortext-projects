Meteor.subscribe "members"

@project = Backbone.View.extend
  initialize: ()->

  set_events :(project)->
    @set_members project
    @set_select_type project
    @set_add_message project
    @set_forms project

  set_forms :(project)->
    #upload
    $("form .upload").click ->
      parameters =
        context:
          app: 'dashboard' #todo change to config value
          project_id: $(this).attr("rel")
          source: 'uploadedCorpus'
        token: Meteor.user().profile.accessToken
        callback_url: Meteor.absoluteUrl('project/' + project.get('id'))
        callback_json: dashboardConfig.services.Api.url+"/project/"+project.get('id')+"/documents"

      #console.log $.param(parameters, true)
      window.location = dashboardConfig.services.Storage.url + "/upload?" + $.param(parameters)

    #start
    $("form .start").click ->
      parameters = 
        context:
          project_id: project.get('id')
        accessToken: Meteor.user().profile.accessToken
        callback_url: Meteor.absoluteUrl('project/' + project.get('id'))
        callback_json: dashboardConfig.services.Api.url+"/project/"+project.get('id')+"/analysis"


      #console.log $.param(parameters, true)
      window.location = dashboardConfig.services.Jobs.url+"/job/new?" + $.param(parameters)


  set_select_type :(project)->
    #button
    $("#add-element #select-type button").on "click", (evt) ->
      $button = $(evt.target)
      $("#add-element #select-type button").not("." + $button.attr("rel")).removeClass "on"
      $("#add-element form").filter(".on").not("form." + $button.attr("rel")).hide().removeClass "on"
      $button.toggleClass "on"
      $("#add-element form." + $button.attr("rel")).slideToggle().toggleClass "on" 

  set_add_message :(project)->
    #add message
    $("#add-element .message .add").on "click", (evt) ->
      evt.preventDefault()
      element = new models.element(
        type: "Message"
        author: app.user_id
        project: parseInt($("#add-element form").attr("rel"))
        date: new Date().getTime()
        content: $("#add-element .message textarea").val()
      )
      element.create
        error: ->
          console.log "new message: fail"
        success: (id)->
          
          element.get_by_id(id)
          element.set permalink: "/element/" + element.get("type") + "/" + id + "/in/" + project.get('id')
          new_el = Template[element.get("type").toLowerCase()]
            author: members.findOne( { id: parseInt(app.user_id) })
            e: element.attributes
          $("#elements").find('#Message-'+element.get('id')).remove()
          $("#elements").prepend new_el 
          $(new_el).css "display", "none"
          $(new_el).fadeIn 1000
          $('form.message').fadeOut('fast')

  set_members :(project)->  
    #members click
    $("#members").delegate ".member", "click", (evt) ->
      user_id = $(this).attr("rel")
      if $(this).hasClass("active")
        $("#members .member").removeClass "inactive"
        $(this).removeClass "active"
        $("#elements").children().filter(":hidden").slideDown "fast"
      else
        $("#members .member").removeClass "active"
        $("#members .member").addClass "inactive"
        $(this).removeClass "inactive"
        $(this).addClass "active"
        $("#elements").children(":not(." + user_id + ")").filter(":not(:hidden)").slideUp "fast"
        $("#elements").children("." + user_id + "").slideDown "fast"

    #add-member click
    $("#add-members .add").on "click", (e) ->
      e.preventDefault()
      project.add_member $("#add-members input").val()

    #add-member keyup
    $("#add-members input").on "keyup", (e) =>
      $("#proposition-members").empty()
      options =
        query: $("#add-members input").val()

        success: (users) ->
          $("#proposition-members").empty()
          if users.length is 0
            $("#proposition-members").html "<p>We cannot find available user for this project</p>"
          else
            _(users).each (u) ->
              user = new models.member(u)
              user.set_gravatar()
              elt = Template.project_proposition_item 
                user: user.attributes
              $elt = $("#proposition-members").append elt
              $("#add-"+u.id).on "click", (evt) ->
                project.add_member u.id

      project.propose_members options
      #$.ajax "/api/Project/" + parseInt($("#add-element form").attr("rel")) + "/members/propose", options

    #new member click
    $("#new-members h4").click ->
      $("#new-members > div ").slideToggle 200


  render_elements: (project)->
    #console.log 'render elem project', project
    $("#elements").empty()

    project.elements = _(project.elements).sortBy (e)->
      -e.date

    _(project.elements).each (e)=>
      element.e = _(e).clone()
      console.log e
      element.author = members.findOne( { id: e.author } )
      if(!_.isUndefined(Template[ e.type.toLowerCase() ]))
        $("#elements").append Template[ e.type.toLowerCase() ] element
      else
        $("#elements").append Template.element element


  render_participants: (project)->
    $("#members .list").empty()
    p_members = project.get('members')
    #console.log 'project render_participants', p_members
    _(p_members).each (m_id)=>    
      m = members.findOne( { id: parseInt(m_id) })
      #console.log m_id
      m.participation = project.get_participation m_id
      $("#members .list").append Template.project_participant m
      
      new participation
        el: $("#members .list .member-"+m_id+" .participation")
        composition: m.participation
      .render()

  render_scripts: ()->
    new queued_scripts
      el: $('#queuedScripts')
    .render()

  render: ()->
    project = @options.project
    project.on "project:loaded", ()=>
      $("#main").html Template.project 
        project: project.attributes
        composition: []
      @render_elements project
      @render_participants project
      @render_scripts()
      @set_events project
      activate_button "#add-element .message textarea", "#add-element .message .add"
      activate_button "#add-members input", null

    project.on "project:elements:changed", ()=>
      @render_elements project
      @render_participants project
      @render_scripts()


    #@options.project.trigger('project:elements:changed')
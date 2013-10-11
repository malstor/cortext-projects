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
        callback_json: null #todo changer lorsque l'api sera développée : "http://collab.cortext.net/api/Project/" + project + "/document"

      console.log $.param(parameters, true)
      window.location = dashboardConfig.services.Storage.url + "/upload?" + $.param(parameters)

    #start
    $("form .start").click ->
      parameters = 
        context:
          project_id: project.get('id')
        accessToken: Meteor.user().profile.accessToken
        callback_url: Meteor.absoluteUrl('project/' + project.get('id'))

      console.log $.param(parameters, true)
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
      #         console.log(element);
      element.create
        error: ->
          console.log "new message: fail"
        success: (id)->
          element.get_by_id(id)
          element.set permalink: "/element/" + element.get("type") + "/" + id + "/in/" + project
          new_el = Templates "Project_" + element.get("type")
            author: members.findOne( { id: parseInt(app.user_id) })
            e: element.toJSON()
          
          $("#elements").prepend new_el
          
          #         console.log(new_el);
          $(new_el).css "display", "none"
          $(new_el).fadeIn 1000

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
      current_project.add_member $("#add-members input").val()

    #add-member keyup
    $("#add-members input").on "keyup", (e) ->
      $("#proposition-members").empty()
      options =
        data:
          query: $("#add-members input").val()

        success: (data) ->
          $("#proposition-members").empty()
          if data.length is 0
            $("#proposition-members").html "<p>We cannot find available user for this project</p>"
          else
            _(data).each (u) ->
              user = new models.user(u)
              user.set_gravatar()
              $elt = $(templates.Project_proposition_item(user: user.toJSON()))
              $("#proposition-members").append $elt
              $elt.children(".plus").on "click", (evt) ->
                current_project.add_member u.id

      $.ajax "/api/Project/" + parseInt($("#add-element form").attr("rel")) + "/members/propose", options

    #new member click
    $("#new-members h4").click ->
      $("#new-members > div ").slideToggle 200


  render_elements: (project)->
    _(project.get('elements')).each (e)=>
      # @$el.find("#elements").append e.author

      element = _(e).clone()
      element.author = members.findOne( { id: e.author } )

      $("#elements").append Template[ e.type.toLowerCase() ] element

  render_participants: (project)->
    $("#members .list").empty()
    p_members = project.get('members')
    _(p_members).each (m_id)=>    
      m = members.findOne( { id: parseInt(m_id) })
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
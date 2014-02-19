Meteor.subscribe "members"

@project = Backbone.View.extend
  initialize: ()->

  set_events :(project)->
    @set_members project
    @set_select_type project
    @set_add_message project
    @set_forms project
    @set_actions project

  set_forms :(project)->
    #upload
    $("form .upload").click ->
      parameters =
        context:
          app: 'dashboard' #todo change to config value
          project_id: $(this).attr("rel")
          source: 'uploadedCorpus'
        token: Meteor.user().profile.accessToken
        callback_url: dashboardConfig.services.Storage.callback+'/project/' + project.get('id')
        callback_json: dashboardConfig.services.Api.url+"/project/"+project.get('id')+"/documents"

      #console.log $.param(parameters, true)
      window.location = dashboardConfig.services.Storage.url + "/upload?" + $.param(parameters)

    #start
    $("form .start").click ->
      parameters = 
        callback_url: dashboardConfig.services.Jobs.callback+'/project/' + project.get('id')
        context:
          project_id: project.get('id')
          callback_url: dashboardConfig.services.Jobs.callback+'/project/' + project.get('id')
          callback_json: dashboardConfig.services.Api.url+"/project/"+project.get('id')+"/analysis"
        accessToken: Meteor.user().profile.accessToken

        


      #console.log $.param(parameters, true)
      window.location = dashboardConfig.services.Jobs.url+"/job/new?" + $.param(parameters)

  set_actions :(project)->
    $('.delete').on "click", (evt) =>
      evt.preventDefault()
      $file = $(evt.target)
      hash = $file.attr("data-id");
      if confirm "Are you sure ? This will delete the file permanently !"
        parameters = 
          token: Meteor.user().profile.accessToken

        HTTP.get dashboardConfig.services.Storage.url+dashboardConfig.services.Storage.getDocument+'/'+hash+'/trash?' + $.param(parameters), (data)=>
          #//@todo : deal with the local database element : mark it as deleted ? delete it ? ...
          @options.project.trigger('project:elements:changed')
          $("#"+hash+" a").css('color', '#f00').html('(deleted)');


  set_select_type :(project)->
    #button
    $("#add-element button").on "click", (evt) ->
      $button = $(evt.target)
      $("#add-element #select-type button").not("." + $button.attr("rel")).removeClass "on"
      $("#add-element form").filter(".on").not("form." + $button.attr("rel")).hide().removeClass "on"
      $button.toggleClass "on"
      $("#add-element form." + $button.attr("rel")).slideToggle().toggleClass "on" 

  set_add_message :(project)->
    $("form.message").css "display", "none"

    $("button.write-message").on "click", ()->
      $("form.message").fadeToggle 'fast'

    $('#main').on "click","a.display-comment" , (evt)->
      evt.preventDefault()
      $linkComment = $(evt.target)      
      idElement = $linkComment.attr('rel')
      $("#comment-"+idElement).fadeToggle 'fast'

    #if it is a new message
    $("#main").on "click",  "button.add", (evt) ->  
      console.log 'click', evt        
      evt.preventDefault()
      evt.stopImmediatePropagation()
      $form = $(evt.currentTarget.form)
      console.log "form ", $form, "text ", $("#"+$form.attr('id')+" textarea").val()
      element = new models.element(
        type: "Message"
        author: app.user_id
        project: parseInt($form.attr("rel"))
        date: new Date().getTime()
        content: $("#"+$form.attr('id')+" textarea").val()
      )
      #if it is a comment
      if _.isUndefined($form.attr("data-element"))
        element.set "commentOn", 0
      else
        element.set "commentOn", parseInt($form.attr("data-element"))

      element.create
        error: ->
          console.log "new message: fail"

        success: (id)->
          console.log "success", id
          element.get_by_id(id)

          element.set permalink: "/element/" + element.get("type") + "/" + id + "/in/" + project.get('id')
          m = new models.member()
          m.get_by_id(app.user_id)
          m.set_gravatar()
          console.log "element", element, "member", m

          #if this is a comment on a comment
          if element.get('commentOn') !=0
            new_comment = Template["comment-item"]
              author: m.attributes
              e: element.attributes
            $("#elements").find('.element [rel="'+element.get('commentOn')+'"]').remove()
            $('[rel="'+element.get('commentOn')+'"] .comment-container').prepend new_comment
            $(new_comment).fadeIn 1000
          else
            new_el = Template[element.get("type").toLowerCase()]
              author: m.attributes
              e: element.attributes
            $("#elements").find('#Message-'+element.get('id')).remove()
            $("#elements").prepend new_el 
            $(new_el).css "display", "none"
            $(new_el).fadeIn 1000

          $('form.message').fadeOut('fast')
          project.trigger 'project:elements:changed'


  set_members :(project)->  
    #members click
    $("#members").on "click",".member", (evt) ->
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
      #console.log e.id
      m = new models.member()
      m.get_by_id(e.author)
      m.set_gravatar()
      element.author = m.attributes
      #console.log 'comments : ', element.comments
      if(!_.isUndefined(Template[ e.type.toLowerCase() ]))
        #console.log "rendering el ", e.id
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
      #console.log 'project elements :', project.elements
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
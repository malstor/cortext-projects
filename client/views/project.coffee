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
          project_id: project.get('id')
          source: 'uploadedCorpus'
        token: Meteor.user().profile.accessToken
        callback_url: dashboardConfig.services.Storage.callback+'/project/' + project.get('id') + '/uploadedCorpus'
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
    #action delete on element
    $('.delete').on "click", (evt) =>
      evt.preventDefault()
      $file = $(evt.target)
      permalink = $file.attr("data-permalink")
      result_id = $file.attr("data-hash")
      element_id = $file.attr("rel")
      type = $file.attr("data-type")
      elm = new models.element()
      console.log "element to be removed : ", element_id, "permalink : ", permalink, "type :", type
      if(permalink?) #if permalink : delete a file
        if confirm "Are you sure ? This will delete the file permanently !"
          parameters = 
            token: Meteor.user().profile.accessToken

          HTTP.get permalink+'/trash?' + $.param(parameters), (error,data)=>
            #//@todo : deal with the local database element : mark it as deleted ? delete it ? ...
            if error
              console.log 'error deleting file ! ',error
              alert "There was an error deleting your file. Please try again later" #fixme : this should be a nice message, not ugly alert...
            else
              switch type
                when 'Document' 
                  elm.delete(element_id)    
                  $("#Document-"+element_id).fadeOut().remove()
                  console.log "removing document ", element_id
                when 'Result'
                  elm.remove_result(result_id)
                  $("#"+result_id).parent().remove()
                  console.log "removing result ", result_id

      else #if not permalink then it is an element
        #for now only message suppression are handled here
        if(type=="Message" or type=="comment")
          elm.delete(element_id)
          $("#"+type+"-"+element_id).remove()
          console.log "removing message ", element_id

      
      @options.project.trigger('project:elements:changed')
      


    #search bar
    $("#search").on "keyup", (evt)->
      evt.preventDefault()
      searchString = $(evt.target).val().trim()
      _.delay (->
          project.searchElements searchString
          project.trigger 'project:elements:changed'
        ),
        300

    #view-all
    $('.element .arrow').on "click", (evt) ->
      $target = $(evt.target)
      $idElement = $target.attr('rel')
      $elements = $("#results-"+$idElement)
      $comments = $("#comments-"+$idElement)
      maxHeight = "150px"
      console.log 'element', $elements.css('max-height')
      if($elements.css('max-height')==maxHeight or $comments.css('max-height')==maxHeight)
        $elements.css('max-height','none')
        $comments.css('max-height','none')
        $target.attr('title', "hide elements")
      else
        $elements.css('max-height',maxHeight)
        $comments.css('max-height',maxHeight)
        $target.attr('title', "view all elements")


  set_select_type :(project)->
    #button
    $("#add-element button").on "click", (evt) ->
      $button = $(evt.target)
      $("#add-element #select-type button").not("." + $button.attr("rel")).removeClass "on"
      $("#add-element form").filter(".on").not("form." + $button.attr("rel")).hide().removeClass "on"
      $button.toggleClass "on"
      $("#add-element form." + $button.attr("rel")).slideToggle().toggleClass "on" 

  set_add_message :(project)->
    $("button.write-message").on "click", ()->
      $("#add-element form.message").fadeToggle 'fast'

    $('#main a.display-comment').on "click", (evt)->
      evt.preventDefault()
      evt.stopImmediatePropagation()
      $linkComment = $(evt.target)      
      idElement = $linkComment.attr('rel')
      $("#comment-"+idElement).fadeToggle 'fast'

    #if it is a new message
    $("#main").on "click",  "button.add", (evt) ->  
      #console.log 'click', evt        
      evt.preventDefault()
      evt.stopImmediatePropagation()
      $form = $(evt.currentTarget.form)
      #console.log "form ", $form, "text ", $("#"+$form.attr('id')+" textarea").val()
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

    #remove membre click
    $("#remove-from-project").on "click", (e) ->
      e.preventDefault()
      if(confirm("Are sure you don't want to be member of this project ?"))
        project.remove_member app.user_id
        location.href = '/dashboard'


  render_elements: (project)->
    #console.log 'render elem project', project
    $("#elements").empty()


    project.elements = _(project.elements).sortBy (e)->
      -e.date

    _(project.elements).each (e)=>
      element.e = _(e).clone()
      # console.log e.id
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

      #show arrow if overflow on files or comments
      eId = "#"+e.type+"-"+e.id
      $elmFiles = $(eId+" .files")[0]
      $elmComment = $(eId+" .comment-container")[0]
      $elmArrow = $(eId+" .arrow")
      $elmArrow.hide()
      if($elmFiles?) and $elmFiles.offsetHeight < $elmFiles.scrollHeight
           $elmArrow.show()
      if($elmComment?) and $elmComment.offsetHeight < $elmComment.scrollHeight
           $elmArrow.show()
           





  render_participants: (project)->
    $("#members .list").empty()
    p_members = project.get('members')
    #if there is more than one member, display "remove yourself" action
    if _.size(p_members)>1
      $("#remove-from-project").show()

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

  render_scripts: (project)->
    new queued_scripts
      el: $('#queuedScripts')
      project: project
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
      @render_scripts project
      @set_events project
      activate_button "#add-element .message textarea", "#add-element .message .add"
      activate_button "#add-members input", null     
      scrollToHash() #noting to here but very handy :)

    project.on "project:elements:changed", ()=>
      @render_elements project
      @render_participants project
      @render_scripts project
      @set_events project
      scrollToHash() #noting to here but very handy :)

    


    #@options.project.trigger('project:elements:changed')
@dashboard = Backbone.View.extend

  render: ()->
    $('#main').html Template.dashboard
    
    new queued_scripts
      el: $('#queuedScripts')
    .render()

    new project_list_simple
      el: $('#projects-simple .projects')
    .render()

    new project_list_with_elements
      el: $('#timeline')
    .render()

    @setEvents()


  setEvents: ()->
    $('#project-new input').on "keyup", (e) ->
      if($("#project-new input").val().length > 0)
        $("#project-new button")
          .attr('disabled',false)
          .addClass('new')
          .removeClass('inactive')
      else
        $("#project-new button")
          .attr('disabled',true)
          .addClass('inactive')
          .removeClass('new')
    
    $('a.first-visit').on "click", (e)->
      e.preventDefault()
      introJs().start()


    $("#project-new button").on "click", (e) ->
      e.preventDefault()
      $title = $("#project-new input").val()
      if(!$title)
       return;
      $("#project-new").fadeOut()
      $("#dashboard").prepend("<p>Creating project "+$title+", please wait...</p>");
      p = new models.project(title: $title)
      console.log 'p = ', p
      id = p.create
        user_id: app.user_id
        success: (id)->
          window.location = p.get('permalink')
        error: (err)->
          console.log 'error while creating project ', err

    $("#search").on 'keyup', (e)=>
      e.preventDefault()
      searchString = $(e.target).val().trim()
      _.delay (=>
            @search_projects(searchString)
        ),
        100

  search_projects: (searchString)->        
     
    searchReg = RegExp.searchReg(searchString)
    projectList = projects.find({
      $or: 
        [
          {'title'          : searchReg},
          {'date_created'   : searchReg}
        ] 
      }, {id:1}).fetch()
    console.log "Search for "+searchReg+"-hide all"
    $("#timeline .project").hide()
    console.log("project found : ", projectList)
    _(projectList).each (p)=>
      #console.log 'project match : ', "#project-"+p.id
      $("#project-"+p.id).fadeIn()
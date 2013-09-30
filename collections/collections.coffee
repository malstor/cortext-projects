@Collections = {}

@Collections =
    init : ()=>
        if(dashboardConfig.services.Identity)
            demo = false
        else
            demo = true

        if(demo)
            @projects = new Meteor.Collection 'demo_projects'
            @elements = new Meteor.Collection 'demo_elements'
            @members = new Meteor.Collection 'demo_members'
            @indicators = new Meteor.Collection 'demo_indicators'
        else
            @projects = new Meteor.Collection 'projects'
            @elements = new Meteor.Collection 'elements'
            @members = new Meteor.Collection 'members'
            @indicators = new Meteor.Collection 'indicators'
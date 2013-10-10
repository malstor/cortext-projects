Meteor.startup ()->    
    Env.init()
    Collections.init()
    DataSync.start()

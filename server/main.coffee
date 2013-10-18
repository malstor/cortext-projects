Meteor.startup ()->    
    Env.init()
    Collections.init()
    #DataSync.start()
    console.log "let's rock."

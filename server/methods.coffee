Meteor.methods( 
    update : ->
        Collections.update(this.userId)
)
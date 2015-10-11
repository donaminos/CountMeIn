Events = new Mongo.Collection('events');

Meteor.methods({
    
    insertEvent:function(newEvent){
        
        return Events.insert(newEvent);
    },
    
    updateEvent:function(currentEvent)
    {
        Events.update({_id:currentEvent._id}, currentEvent);
    }
    
});
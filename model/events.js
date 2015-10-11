Events = new Mongo.Collection('events');

Meteor.methods({
    
    insertEvent:function(newEvent){
        
        return Events.insert(newEvent);
    },
    
    updateEvent:function(currentEvent)
    {
        Events.update({_id:currentEvent._id}, currentEvent);
    },

   	addChatItem : function(id,chat){
        /*
         chat ==>
         {
	         text : "",
	         image : "", --> "" or url
	         important :  --> 1-10
	         votes : 10 --> numerical,number of upvotse 
	         userId : ""
         }
        */
        Events.update({ _id:id}, { $push: { chat : chat} })
    }
    
});
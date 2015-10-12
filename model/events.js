Events = new Mongo.Collection('events');

Meteor.methods({
    
    insertEvent:function(newEvent){
        console.log(angular.toJson(newEvent));
        return Events.insert( angular.toJson(newEvent) );
    },
    
    updateEvent:function(currentEvent)
    {
        console.log(Events.update({_id:currentEvent._id}, currentEvent));
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
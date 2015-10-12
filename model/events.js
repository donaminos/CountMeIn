Events = new Mongo.Collection('events');


Meteor.methods({
    
    findInvitation: function(q)
    {
        return Events.findOne({_id: q.id, participants:{ $elemMatch : { token: q.token}}});
    },
    
    changeInvitationStatus: function(q, status)
    { 
        var set = {};
        
        if(status != 'going' || Meteor.userId())
        {
            if(status == 'going')
            {
                set['participants.$.userId'] = Meteor.userId();
                
            }
            
            set['participants.$.status'] = status;
            Events.update({_id: q.id, participants:{ $elemMatch : { token: q.token}}}, {$set : set});
        }
    }
    
});

if(Meteor.isServer){
    
    Meteor.methods({

        insertEvent:function(newEvent)
        {   
            var id = Events.insert(newEvent);
            newEvent._id = id;
            notifyNewParticipants(newEvent);
            return id;
        },

        updateEvent:function(currentEvent)
        {
            notifyNewParticipants(currentEvent);
            Events.update({_id:currentEvent._id}, currentEvent);
        } 

    });
    
    function notifyNewParticipants(evnt){
        _.each(evnt.participants, function(participant){
            if(participant.status === 'listed'){
                
                var inviteUrl = Meteor.absoluteUrl() + 'event-view/' + evnt._id + '/invitation/'+ participant.token;
                sendEmail(participant.email, 'noreply@countmein.co', 'Invited', inviteUrl);
                
                participant.status = 'invited';
            }
        })
    }
    
    function sendEmail(to, from, subject, text) {
        //check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        //this.unblock();

        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text
        });
    }
    
}
angular.module('countmein').controller('EventFormCtrl', ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){
            
        var eventid = $stateParams.eventId;
        

        function getCurrentEvent(){
        	return Events.findOne({ 
            	participants : { 
            		$elemMatch: {
                     userId: Meteor.userId()
                	} 
            	}, _id: eventid 
            });
        }

        var event_current = getCurrentEvent();
		var tickCallBack = function(polls_Questions_id,pools){
			for(var x in event_current.polls_Questions){
        		var pollquestion = event_current.polls_Questions[x];
        		if(polls_Questions_id == pollquestion.id){
        			event_current.polls_Questions[x].polls = pools;
        		}
        	}

        	var object = JSON.parse(angular.toJson(event_current));
        	Events.update({_id: eventid}, object);
		}


       	
       	console.log(event_current.polls_Questions);
       	for(var x in event_current.polls_Questions){
       		event_current.polls_Questions[x].state = "allowchange";
       		event_current.polls_Questions[x].itemcheckedCallback = tickCallBack;
       	}
       	$scope.polls_Questions = event_current.polls_Questions;
        
    }]);
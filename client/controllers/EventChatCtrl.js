angular.module('countmein').controller('EventChatCtrl', ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){
        $scope.$meteorSubscribe('events'); 
        $scope.chat = {};
		$scope.chat.text;

        var eventid = $stateParams.eventId;
        var currentuserId = "acdfkdfdxdfdf";
        
        // access parent scope
        //console.log("Parent:" + $scope.$parent.currentEvent);
        
        $scope.showChat = $meteor.collection(function(){
            return Events.find({ 
            	participants : { 
            		$elemMatch: {
                     userId: currentuserId
                	} 
            	}, _id: eventid 
            });
        });

        $scope.chatnow = function(){
        	if($scope.chat.text != ""){
        		 $meteor.call("addChatItem", eventid ,{
			         text : $scope.chat.text,
			         image : "", 
			         important : 1, 
			         votes : 0 ,
			         userId : currentuserId
		         }); 
        	}
        }

}]);
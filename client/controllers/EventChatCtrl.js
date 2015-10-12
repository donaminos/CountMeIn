angular.module('countmein').controller('EventChatCtrl', ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){
        $scope.$meteorSubscribe('events'); 
        $scope.chat = {};
		$scope.chat.text;

		$scope.poll_items = [];
		/*
		$scope.createpollConfig = {
			poll_title : "Place Visiting",
			poll_description : "We need to decide a good place to visit, so please vote",
			state : "create",  //allowchange
			polls : [],
			type : "checkboxes"  //radio //checkboxes
		}
		*/

/*
		$scope.createpollConfig = {
			poll_title : "Place Visiting",
			poll_description : "We need to decide a good place to visit, so please vote",
			state : "allowchange", //allowchange
			polls : [
				{id : 1 ,text: "Kandy", value : true , count : 10},
				{id : 2 ,text: "Anu", value : false , count : 21}
			],
			type : "checkboxes" , //radio //checkboxes
			itemcheckedCallback : function(index, pools){
					console.log(index);
					console.log(pools);
			}
		}


		$scope.poll_items.push($scope.createpollConfig);

		*/

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
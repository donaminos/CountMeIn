angular.module('countmein').controller('EventEditCtrl', ['$scope', '$meteor', '$stateParams', '$location',
    function($scope, $meteor, $stateParams, $location){       
        
        
        console.log("Show:" + $stateParams.eventId);
        
        $scope.currentEvent = {
            polls_Questions : []
        };
        
        if($stateParams.eventId)
        {
            $scope.currentEvent = Events.findOne({_id:$stateParams.eventId});
        }
        
        $scope.save = function(){
            for(var x in $scope.currentEvent.polls_Questions){
                    if($scope.currentEvent.polls_Questions[x].polls.length == 0){
                        $scope.currentEvent.polls_Questions.splice(x,1);
                    }
                }
            //$scope.currentEvent.polls_Questions = ["ddf"];
            if($stateParams.eventId){
                $meteor.call('updateEvent', $scope.currentEvent).then(function(ed){
                    redirectToView($stateParams.eventId);
                });
            }else{                
                $meteor.call('insertEvent', $scope.currentEvent).then(function(id){
                    redirectToView(id);
                });
            }
        }

        $scope.addPollItem = function(type){
            var poolconf = {
                    poll_title : "",
                    poll_description : "",
                    state : "create",  //allowchange
                    polls : [],
                    type : type //"checkboxes"  //radio //checkboxes
            }
            $scope.currentEvent.polls_Questions.push(poolconf);
        }
        
        function redirectToView(id){
            var earl = '/event-view/' + id;
            $location.path(earl);
        }
        
    }]);
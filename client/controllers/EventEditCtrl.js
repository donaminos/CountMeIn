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
                    $scope.currentEvent.polls_Questions[x].state = "viewonly";
                    
                }
            if($stateParams.eventId){
                var eventob = JSON.parse(angular.toJson($scope.currentEvent));
                $meteor.call('updateEvent', eventob).then(function(ed){
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
                    state : "create",  //allowchange   //viewonly
                    polls : [],
                    type : type //"checkboxes"  //radio //checkboxes
            }
            $scope.currentEvent.polls_Questions.push(poolconf);
        }

        $scope.editPol = function(index){
            $scope.currentEvent.polls_Questions[index].state = "create" ;
        }
        
        function redirectToView(id){
            var earl = '/event-view/' + id;
            $location.path(earl);
        }
        
    }]);
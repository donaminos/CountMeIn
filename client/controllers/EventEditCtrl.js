angular.module('countmein').controller('EventEditCtrl', ['$scope', '$meteor', '$stateParams', '$location',
    function($scope, $meteor, $stateParams, $location){       
        
        
        console.log("Show:" + $stateParams.eventId);
        
        $scope.currentEvent = {};
        
        if($stateParams.eventId)
        {
            $scope.currentEvent = Events.findOne({_id:$stateParams.eventId});
        }
        
        $scope.save = function(){
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
        
        function redirectToView(id){
            var earl = '/event-view/' + id;
            $location.path(earl);
        }
        
    }]);
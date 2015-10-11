angular.module('countmein').controller('EventShowCtrl', ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){
            
        console.log("Show:" + $stateParams.eventId);                                                      
                                                         
        $scope.currentEvent = Events.findOne({_id:$stateParams.eventId});
        
    }]);
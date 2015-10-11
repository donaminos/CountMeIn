angular.module('countmein').controller('EventParticipantsCtrl', ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){
            
        console.log("Participants:" + $stateParams.eventId);
        
        // access parent scope
        console.log("Parent:" + $scope.$parent.currentEvent.name);
        
    }]);
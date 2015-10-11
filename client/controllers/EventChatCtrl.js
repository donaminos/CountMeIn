angular.module('countmein').controller('EventChatCtrl', ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){
            
        console.log("Discussion:" + $stateParams.eventId);
        
        // access parent scope
        console.log("Parent:" + $scope.$parent.currentEvent.name);
        
    }]);
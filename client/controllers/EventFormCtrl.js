angular.module('countmein').controller('EventFormCtrl', ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){
            
        console.log("Form:" + $stateParams.eventId);
        
        // access parent scope
        console.log("Parent:" + $scope.$parent.currentEvent.name);
        
    }]);
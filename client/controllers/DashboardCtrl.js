angular.module('countmein').controller('DashboardCtrl', ['$scope', '$meteor',
    function($scope, $meteor){
        
        $scope.events = $meteor.collection(function() {
            return Events.find();
        });
        
    }]);
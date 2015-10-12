angular.module('countmein').controller('EventEditCtrl', ['$scope', '$meteor', '$stateParams', '$location',
    function($scope, $meteor, $stateParams, $location){       
        
        
        console.log("Show:" + $stateParams.eventId);
        
        $scope.currentEvent = {};
        $scope.currentEvent.participants = [];
        
        if($stateParams.eventId)
        {
            $scope.currentEvent = Events.findOne({_id:$stateParams.eventId});
        }
        
        $scope.save = function(){
            
            var evnt = angular.copy($scope.currentEvent);
            
            evnt.owner = Meteor.userId();
            
            if($stateParams.eventId){
                $meteor.call('updateEvent', evnt).then(function(){
                    redirectToView($stateParams.eventId);
                });
            }else{                
                $meteor.call('insertEvent', evnt).then(function(id){
                    redirectToView(id);
                });
            }
        }
        
        $scope.addParticipants = function(emailAddress)
        {
            if(validateEmail(emailAddress))
            {
                $scope.currentEvent.participants.push({
                    email:emailAddress,
                    token:guid(), //better to do it in server side,
                    status:'listed'
                });
                $scope.participantsEmail = "";
            }            
        }
        
        function redirectToView(id){
            var earl = '/event-view/' + id;
            $location.path(earl);
        }
        
        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
        }
        
        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }       
        
        
    }]);
angular.module('countmein').controller('EventEditCtrl', ['$scope', '$meteor', '$stateParams', '$location',
    function($scope, $meteor, $stateParams, $location){       
        
        
        console.log("Show:" + $stateParams.eventId);
        
        $scope.currentEvent = {
            polls_Questions : []
        };

        $scope.currentEvent.participants = [];
        
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
            var evnt = JSON.parse(angular.toJson(angular.copy($scope.currentEvent)));
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
angular.module('countmein').controller('EventInvitationCtrl', ['$scope', '$meteor', '$stateParams', '$location',
    function($scope, $meteor, $stateParams, $location){
        
        
        
        var q = {
            id: $stateParams.eventId,
            token: $stateParams.token
        }
        
        var targetEvent;
        
        $meteor.call('findInvitation', q).then(function(result){
            
            $meteor.call('changeInvitationStatus', q, 'seen')
            targetEvent = result;
            
        });
        
        $scope.showThanks = false;
        
        $scope.yes = function(){            
            if(targetEvent)
            {
                if(!Meteor.userId())
                {
                    Meteor.loginWithFacebook({}, function(error){
                        if(error)
                        {
                            throw new Meteor.Error("Facebook login failed");
                        }
                        $meteor.call('changeInvitationStatus', q, 'going')
                        $location.path = '/event-view/' + targetEvent._id + '/form';
                    });
                }else{
                    $meteor.call('changeInvitationStatus', q, 'going')
                    $location.path = '/event-view/' + targetEvent._id + '/form';
                }
            }            
        }
        
        $scope.nope = function (){
            if(targetEvent)
            {
                $meteor.call('changeInvitationStatus', q, 'decline').then(function(){
                    showThanks = true;
                });                
            } 
        }
        
    }]);
angular.module("countmein").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'client/views/home.ng.html'
        })
        .state('signin', {
            url: '/signin',
            controller: ['$location',function($location){
                signin(function(error){
                    $location.path('/');
                });
            }],
            templateUrl: 'client/views/home.ng.html',
        })
        .state('signout', {
            url: '/signout',
            controller: ['$location',function($location){
                signout(function(error){
                    $location.path('/');
                })
            }]
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'client/views/dashboard.ng.html',
            controller: 'DashboardCtrl',
            resolve : {
                authCheck: ['$q', '$location', function($q, $location)
                {
                    var deffered = $q.defer();

                    signin(function(error){
                        if (error) {
                            //throw new Meteor.Error("Facebook login failed");
                            deffered.reject();
                            $location.path('/');
                        }else{
                            deffered.resolve();
                        }  
                    });

                    return deffered.promise;
                }]
            }
        })
        .state('eventEdit/', {
            url: '/event-edit/:eventId',
            params: { eventId: {squash: true, value: null}},
            templateUrl: 'client/views/event-edit.ng.html',
            controller: 'EventEditCtrl',
            resolve : {
                authCheck: ['$q', '$location', function($q, $location)
                {
                    var deffered = $q.defer();

                    signin(function(error){
                        if (error) {
                            //throw new Meteor.Error("Facebook login failed");
                            deffered.reject();
                            $location.path('/');
                        }else{
                            deffered.resolve();
                        }  
                    });

                    return deffered.promise;
                }]
            }
        })
        .state('eventView', {
            url: '/event-view/:eventId',
            templateUrl: 'client/views/event-view.ng.html',
            controller: 'EventShowCtrl',
            abstract: true
        })
        .state('eventView.form', {
            url: '/form',
            templateUrl: 'client/views/event-form.ng.html',
            controller: 'EventFormCtrl'
        })
        .state('eventView.invitation', {
            url: '/invitation/:token',
            templateUrl: 'client/views/event-invitation.ng.html',
            controller: 'EventInvitationCtrl'
        })
        .state('eventView.chat', {
            url: '/chat',
            templateUrl: 'client/views/event-chat.ng.html',
            controller: 'EventChatCtrl'
        })
        .state('eventView.participants', {
            url: '/participants',
            templateUrl: 'client/views/event-participants.ng.html',
            controller: 'EventParticipantsCtrl'
        }); 
      
        $urlRouterProvider.when("/event-view/:eventId", "/event-view/:eventId/form");

        $urlRouterProvider.otherwise("/");
      
        function signin(callback)
        {
            if(!Meteor.userId())
            {
                Meteor.loginWithFacebook({}, function(error){
                    callback(error);                           
                });
            }else{
                callback();
            }
        }
      
        function signout(callback)
        {
            Meteor.logout(function(error){
                callback(error);
            })
        }
      
  }]);
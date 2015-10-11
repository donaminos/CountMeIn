angular.module("countmein").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'client/views/dashboard.ng.html',
            controller: 'DashboardCtrl'
        })
        .state('eventEdit/', {
            url: '/event-edit/:eventId',
            params: { eventId: {squash: true, value: null}},
            templateUrl: 'client/views/event-edit.ng.html',
            controller: 'EventEditCtrl'
        })
        .state('eventView', {
            url: '/event-view/:eventId',
            templateUrl: 'client/views/event-view.ng.html',
            controller: 'EventShowCtrl'
        });      

        $urlRouterProvider.otherwise("/");
  }]);
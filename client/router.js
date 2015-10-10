angular.module("countmein").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'client/views/template.ng.html',
            controller: 'controller'
        })
        .state('t1', {
            url: '/t1',
            templateUrl: 'client/views/template1.ng.html',
            controller: 'controller1'
        })
        .state('t2', {
            url: '/t2',
            templateUrl: 'client/views/template2.ng.html',
            controller: 'controller2'
        });      

        $urlRouterProvider.otherwise("/");
  }]);
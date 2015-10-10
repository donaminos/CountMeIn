angular.module('countmein',[
  'angular-meteor',
  'ui.router'
]);

angular.element(document).ready(function(){
    angular.bootstrap(document, ['countmein']);
});
(function() {
  'use strict';

  angular.module('angularSeed')
    .config(AngularSeedConfig);

  AngularSeedConfig.$inject = [
    '$locationProvider',
    '$mdThemingProvider',
    '$stateProvider'
  ];

  function AngularSeedConfig(
    $locationProvider,
    $mdThemingProvider,
    $stateProvider
  ) {

    $stateProvider
      .state('helloWorld', {
        url: '/hello-world',
        template: ''
      });

    $locationProvider.html5Mode(false);

    $locationProvider.hashPrefix('');

    $mdThemingProvider.theme('default').dark();
  }

})();

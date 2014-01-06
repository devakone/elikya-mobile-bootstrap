'use strict';

angular.module('elikyaMobileApp')
  .directive('alert',['mm.config', function(mmConfig) {
    return {
      templateUrl:'/views/partials/alert.html',
      restrict: 'E',
      scope:{
          alert:"=alert"
      },
      replace:true,
      link: function postLink(scope, element, attrs) {
      }
    };
  }]);

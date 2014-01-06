'use strict';

angular.module('elikyaMobileApp')
  .directive('backButton', function($window){
    return {
      restrict: 'A',

      link: function(scope, element, attrs) {
        element.bind('click', goBack);

        function goBack() {
          $window.history.back();
          scope.$apply();
        }
      }
    }
});

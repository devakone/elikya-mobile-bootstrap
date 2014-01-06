'use strict';

angular.module('elikyaMobileApp')
  .directive('pickadate', function () {
    return {
    	// Enforce the angularJS default of restricting the directive to
      	// attributes only
      	restrict: 'A',
      	// Always use along with an ng-model
      	require: '?ngModel',
      	// This method needs to be defined and passed in from the
      	// passed in to the directive from the view controller
      	scope: {
        	select: '&',
          dobOptions:"="        // Bind the select function we refer to the right scope
      	},
      	link: function(scope, element, attrs, ngModel) {
        	if (!ngModel) return;

        	var optionsObj = {
        		today: false,
        		monthSelector: true,
				    yearSelector: true,
				    format: 'mmmm d yyyy',
            firstDay: 1
        	};

         console.dir(scope.dobOptions)

          optionsObj = angular.extend(optionsObj, scope.dobOptions)
  
        	var updateModel = function(dateTxt) {
          			scope.$apply(function () {
            		// Call the internal AngularJS helper to
            		// update the two way binding
            		ngModel.$setViewValue(dateTxt);
          		});
        	};

        	optionsObj.onSet = function(dateTxt, picker) {
          		updateModel(dateTxt);
          		if (scope.select) {
            		scope.$apply(function() {
              			scope.select({date: dateTxt});
            		});
          		}
        	};

        	ngModel.$render = function() {
          		// Use the AngularJS internal 'binding-specific' variable
          	element.pickadate('select', ngModel.$viewValue || '');
        	};
          //Boostrap the plugin
        	element.pickadate(optionsObj);
    	}
    };
  });

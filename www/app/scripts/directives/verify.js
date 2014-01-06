'use strict';
/**
 * Checks that the to fields match fields match
 */
angular.module('elikyaMobileApp').directive("verify", function() {
    return {
        require: "ngModel",
        scope: {
            verify: '='
        },
        link: function(scope, element, attrs, ctrl) {

            ctrl.$parsers.unshift(function(valueToConfirm)
            {
                var valueToVerify = scope.verify;
                if (valueToVerify != valueToConfirm) {
                    ctrl.$setValidity("verify", false);
                    return undefined;
                }
                else
                {
                    ctrl.$setValidity("verify", true);
                    return valueToConfirm;
                }
            });
           //On blur just set the view value and let validation proceed
           element.unbind('input').unbind('keydown').unbind('change');
           element.bind('blur', function(events){

               scope.$apply(function(){
                   ctrl.$setViewValue(element.val());
               })


           });

            //On enter we want to set the value to what was entered, validate, and then apply the correct class
            element.bind('keyup',function(event){
                //Sync our changes with the scope
                if (13 == event.which) {

                    element.trigger('blur');
                }
            })



        }
    };
});
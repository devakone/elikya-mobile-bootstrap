'use strict';
/**
 * Makes a service call to determine if a username or company name are available
 */
angular.module('elikyaMobileApp').directive("noPreExisting",['$http', function($http) {
    return {
        require: "ngModel",
        priority:3,

        link: function(scope, element, attrs, ctrl) {
            //Unbind validation as we type
            if (attrs.type === 'radio' || attrs.type === 'checkbox') return;
            element.unbind('input').unbind('keydown').unbind('change');
            var type = attrs.noPreExistingType;

            /**
             * Callback for a successful service call
             * @param response
             */
            function preExistingValueResponse(response){

                  if(response.isAvailable){
                      ctrl.$setValidity('nopreexisting', true)
                  }
                  else
                  {
                      ctrl.$setValidity('nopreexisting', false)
                  }
                //mmValidationService.setControlGroupCls(element, ctrl,attrs);
                if(ctrl.$setInvalidClass){
                    ctrl.$setInvalidClass();
                }

            }

            function preExistingValueResponseFailed(response){

            };

            function resetExistenceValidation(){

            }

            /**
             * Checks if an element is actually invalid and not because the 'preexisting' validation was set on it
             * @return {Boolean}
             */
            function isInputValidBeforeServiceCall(){
               var validationErrors =[];
               var isValid = true;
               for(var errorType in ctrl.$error)
               {
                   if(errorType != "nopreexisting" && ctrl.$error[errorType])
                   {
                        isValid=false;
                   }
               }

               return isValid;
            }


            //On blur we make the service call to check for preexistence
            element.bind('blur', function(event){

                scope.$apply(function(){
                    ctrl.$setViewValue(element.val())
                    if(isInputValidBeforeServiceCall() )
                    {
                        loginService.verifyPreExisting(type, ctrl.$viewValue)
                            .success(preExistingValueResponse)
                            .error(preExistingValueResponseFailed)
                    }
                    else
                    {
                        mmValidationService.setControlGroupClsOnlyOnDefinedValues(element, ctrl,attrs)
                    }
                })
            })

            //On enter we want to set the value to what was entered, validate, and then apply the correct class
            element.bind('keyup',function(event){
                //Sync our changes with the scope
                if (13 == event.which) {

                    element.trigger('blur');
                }
            })
            //On focus, just reset the class to its neutral state (so success or error class)
            element.bind('focus',function(event){

                //Sync our changes with the scope
                scope.$apply(function() {
                    mmValidationService.resetControlGroupCls(element, ctrl, attrs)
                })
            })

        }
    };
}]);

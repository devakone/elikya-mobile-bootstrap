'use strict';

angular.module('elikyaMobileApp')
	.service('wizard',['$rootScope', function wizard($rootScope) {
		
		var wizardService ={
			 step:0,
			 steps:[],
			 showSteps:false,
			 
			 isCurrentStep :function(step) {
			    return this.step === step;
			  },
			  setSteps : function(steps) {
				    this.steps = steps;
			  },
			
			  setCurrentStep : function(step) {
			    this.step = step;
			  },
			
			  getCurrentStep : function() {
			    return this.steps[this.step];
			  },
			  
			  isFirstStep : function() {
			        return this.step === 0;
			    },
	
			  isLastStep : function() {
		        return this.step === (this.steps.length - 1);
			  },
	
			  getNextLabel : function() {
		        return (this.isLastStep()) ? 'Finish' : 'Next'; 
			  },
	
			  handlePrevious : function() {
		        this.step -= (this.isFirstStep()) ? 0 : 1;
			  },
	
			  handleNext : function(dismiss) {
		        if(this.isLastStep()) {
		            $rootScope.$broadcast('wizardCompleted')
		        } else {
		            this.step += 1;
		        }
			  }
		}
		return wizardService
  }]);

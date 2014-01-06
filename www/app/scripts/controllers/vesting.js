'use strict';

angular.module('elikyaMobileApp')
  .controller('VestingCtrl',['$scope','$state','$stateParams','wizard', function ($scope, $state, $stateParams, wizard) {
	  $scope.user={};
	  $scope.vestings=[];
	  $scope.vesting={}	 
	  $scope.navigate = $state.transitionTo;
	  
      
	  $scope.$on('wizardCompleted', saveVesting)
	
	  function saveVesting(){
		  console.log($scope.vesting);
		  $state.navigate('vestings.list')		  
	  }
	  
	  $scope.init=function(){
		  wizard.setSteps(['one', 'two']);
		  wizard.showSteps = false;
		  $scope.vesting = {
				  start_date: moment().add('days', 7).calendar()
		  };
		  wizard.setCurrentStep(1);    
	  }
	  
	  $scope.init();
  }]);

'use strict';

angular.module('elikyaMobileApp')
  .controller('MainCtrl',['$scope','$rootScope','$location','authService','Global', function ($scope,$rootScope, $location, authService, userService, Global) {
	  $scope.vestings=[];
	  $scope.activeTab="account";
	  $scope.opts={
			  addBodyClasses:true
	  }
	  $scope.dobOptions={ 
	  		formatSubmit: 'mm/dd/yyyy', 
	  		hiddenPrefix: 'verification_'
	  }
	  $scope.global = Global;
	 
	  
	  $scope.init = function(){
		  if(!authService.isAuthenticated())
		  {
			 // $location.url('/login')
		  }
		  else
		  {
			  
		  }
		  $scope.user=$rootScope.user;
		  $scope.isCollapsed =true;
	  }
	  
	  $scope.setActiveTab= function(tabName){
		  $scope.activeTab = tabName 
		  $navigate.eraseHistory()
	  }
	  
	  $scope.navigate=function()
	  {
		  
	  }

	  $scope.$on('$stateChangeSuccess', 
			function(event, toState, toParams, fromState, fromParams){ 
			   
		})
    
	  $scope.init();
  }]);

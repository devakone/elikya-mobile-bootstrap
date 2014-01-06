'use strict';

angular.module('elikyaMobileApp')
  	.controller('AccountCtrl',['$scope','$rootScope','$state','$stateParams','user', function ($scope, $rootScope, $state, $stateParams, user) {
	  	//User here was resolved in the route
	  	$scope.user=user;
	  	$scope.alerts=[];
	  	$scope.alertMessages={
	        generic:"Oh no! Something went wrong on our end, please try again!",
	        noPaymentMethod:"You have no current payment method set up!"
	    }
	    $scope.paymentMethodSelected=false;

	  	$scope.$on('$stateChangeSuccess', 
			function(event, toState, toParams, fromState, fromParams){ 
			    $scope.alerts=[];
			    var paymentMethodSelected = isPaymentMethodSelected()
			 	if($state.is("account.home"))
				{
					
			    }
			    if($state.is("account.verify.address"))
				{
					$scope.showBackButton = true;
			    }
			    if($state.is("account.verify.phone"))
				{
					$scope.showBackButton = true;
			    }
			    if($state.is("account.verify.complete"))
				{
					$scope.showBackButton = false;
			    }
		})

		function isPaymentMethodSelected(){
			if(user.dwolla){
				  $scope.paymentMethodSelected=true;
				  return true
			}
			return false
		}

	  
  }]);

'use strict';

angular.module('elikyaMobileApp')
  .controller('DwollaCtrl', ['$scope','$rootScope','$state','$stateParams','user','profile', userProfileService, function ($scope,$rootScope, $state, $stateParams,user, VerificationService,profile, UserProfile) {
   
  	$scope.user=user;
  	$scope.dwolla={
  		email:user.email,
  		firstName:user.profile.firstName,
  		lastName:user.profile.lastName,

  	};
	

  	
  	$scope.dobOptions={ 
  		formatSubmit: 'mm/dd/yyyy', 
  		hiddenPrefix: 'verification_'
  	}

  	$scope.navigate = $state.transitionTo;
	$scope.showBackButton = false;
	$scope.nextButtonLabel = "Next";
	$scope.backButtonLabel = "Back";

	$scope.next = function(form){
		$scope.submitting = true;
		if($state.is("account.dwolla.general") && $scope.ensureValidation(form))
		{			
			$scope.submitting = false;
			VerificationService.setGeneralInformation($scope.profile);
			$state.go("account.dwolla.address");
		}
		if($state.is("account.dwolla.address")&& $scope.ensureValidation(form))
		{
			$scope.submitting = false;
			VerificationService.setAddressInformation($scope.profile);
			$state.go("account.dwolla.phone");
		}
		if($state.is("account.dwolla.phone")&& $scope.ensureValidation(form))
		{
			$scope.submitting = false;
			VerificationService.setPhoneInformation($scope.profile);
			var profile=VerificationService.getUserProfile();
			profile._user=user._id
			UserProfile.save( profile, function(savedProfile){
				$state.go("account.dwolla.complete");
			},
			function(error){
				//User is registered but not confirmed yet
                $scope.alerts = [{
                    msg: error.data.message|| error.data.error,
                    type:'danger'
                }];
			} 
			);
			
			
		}
	}

	
	$scope.back = function(form){
		$scope.submitting = true;
		if($state.is("account.dwolla.address"))
		{
			$scope.submitting = false;
			VerificationService.setAddressInformation($scope.profile);
			$state.go("account.dwolla.general")
		}
		if($state.is("account.dwolla.phone"))
		{
			$scope.submitting = false;
			VerificationService.setPhoneInformation($scope.profile);
			$state.go("account.dwolla.address")
		}
		
	}

	$scope.ensureValidation = function(form){
		if($state.is("account.dwolla.general"))
		{
			if(form.$valid)
			{
				return true;
			}
			return false;
	    }
	    if($state.is("account.dwolla.address"))
		{
			if(form.$valid)
			{
				return true;
			}
			return false;
	    }
	    if($state.is("account.dwolla.phone"))
		{
			$scope.validateVerificationCode(form)
			if(form.$valid)
			{
				return true;
			}
			return false;
	    }
	    if($state.is("account.dwolla.complete"))
		{
			
	    }
	    return true;
	}
     
	$scope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 
		    console.log("State Change Start!!")
		    // transitionTo() promise will be rejected with 
		    // a 'transition prevented' error
	})

	$scope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){ 
		    console.log("State Change Success!!")
		 	if($state.is("account.dwolla.general"))
			{
				$scope.showBackButton = false;
		    }
		    if($state.is("account.dwolla.address"))
			{
				$scope.showBackButton = true;
		    }
		    if($state.is("account.dwolla.phone"))
			{
				$scope.showBackButton = true;
		    }
		    if($state.is("account.dwolla.complete"))
			{
				$scope.showBackButton = false;
		    }
	})

	$scope.$on('$stateChangeError', 
		function(event, toState, toParams, fromState, fromParams){ 
		    console.log("State Change Error !!")
		    // transitionTo() promise will be rejected with 
		    // a 'transition prevented' error
	})

	$scope.$on('$stateNotFound', 
	function(event, unfoundState, fromState, fromParams){ 
	    console.log(unfoundState.to); // "lazy.state"
	    console.log(unfoundState.toParams); // {a:1, b:2}
	    console.log(unfoundState.options); // {inherit:false} + default options
	})

	
	function saveUserProfile(){
		//console.log($scope.userProfile);
		$state.navigate('account.home')		  
	}
	  
	$scope.init=function(){

		$scope.dobOptions.min = moment().subtract('years',18).toDate().getTime();
		console.log('Verification controller initiated');
	}
	  
	$scope.init();


  }]);

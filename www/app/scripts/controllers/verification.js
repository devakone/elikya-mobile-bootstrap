'use strict';

angular.module('elikyaMobileApp')
	.controller('VerificationCtrl',['$scope','$rootScope','$state','$stateParams','user','VerificationService','userProfileService', function ($scope,$rootScope, $state, $stateParams,user, VerificationService, UserProfile) {

		$scope.user=user;
		$scope.profile=VerificationService.getUserProfile();

	  	
	  	$scope.dobOptions={ 
	  		formatSubmit: 'mm/dd/yyyy', 
	  		hiddenPrefix: 'verification_'
	  	}
	  	//SMS Verification code
	  	$scope.smsVerificationCode=false;
	  	$scope.showVerificationCodeInput= false;
	  	$scope.noSMSVerificationAttempted=false;
	  	$scope.navigate = $state.transitionTo;
		$scope.showBackButton = false;
		$scope.nextButtonLabel = "Next";
		$scope.backButtonLabel = "Back";
		$scope.next = function(form){
			$scope.submitting = true;
			if($state.is("account.verify.general") && $scope.ensureValidation(form))
			{			
				$scope.submitting = false;
				VerificationService.setGeneralInformation($scope.profile);
				$state.go("account.verify.address");
			}
			if($state.is("account.verify.address")&& $scope.ensureValidation(form))
			{
				$scope.submitting = false;
				VerificationService.setAddressInformation($scope.profile);
				$state.go("account.verify.phone");
			}
			if($state.is("account.verify.phone")&& $scope.ensureValidation(form))
			{
				$scope.submitting = false;
				VerificationService.setPhoneInformation($scope.profile);
				var profile=VerificationService.getUserProfile();
				profile._user=user._id
				UserProfile.save( profile, function(savedProfile){
					$state.go("account.verify.complete");
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

		$scope.getSmsVerificationCode=function(form){
			$scope.profile.smsVerificationCode="";
			var smsRequest = {
				userId:user._id,
				phone:$scope.profile.phone_number
			}
			VerificationService.getSmsVerificationCode(smsRequest).success(function(verificationCodeResponse){
				$scope.smsVerificationCode=verificationCodeResponse.verificationCode;
				//TODO REMOVE
				$scope.profile.smsVerificationCode=verificationCodeResponse.verificationCode; 
				$scope.showVerificationCodeInput=true;
				form.phoneNumber.$setValidity("smssent", true);
			})
		}


		$scope.validateVerificationCode=function(form){
			if(!form.phoneNumber.$error.required && !$scope.showVerificationCodeInput)
			{
				form.phoneNumber.$setValidity("smssent", false);
				return;
			}
			if($scope.profile.smsVerificationCode === $scope.smsVerificationCode)
			{
				form.userVerificationCode.$setValidity("verify", true);
			}
			else
			{
				form.userVerificationCode .$setValidity("verify", false);
			}			
			
		}

		$scope.back = function(form){
			$scope.submitting = true;
			if($state.is("account.verify.address"))
			{
				$scope.submitting = false;
				VerificationService.setAddressInformation($scope.profile);
				$state.go("account.verify.general")
			}
			if($state.is("account.verify.phone"))
			{
				$scope.submitting = false;
				VerificationService.setPhoneInformation($scope.profile);
				$state.go("account.verify.address")
			}
			
		}

		$scope.ensureValidation = function(form){
			if($state.is("account.verify.general"))
			{
				if(form.$valid)
				{
					return true;
				}
				return false;
		    }
		    if($state.is("account.verify.address"))
			{
				if(form.$valid)
				{
					return true;
				}
				return false;
		    }
		    if($state.is("account.verify.phone"))
			{
				$scope.validateVerificationCode(form)
				if(form.$valid)
				{
					return true;
				}
				return false;
		    }
		    if($state.is("account.verify.complete"))
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
			 	if($state.is("account.verify.general"))
				{
					$scope.showBackButton = false;
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

'use strict';

angular.module('elikyaMobileApp')
  .controller('AuthenticationCtrl',['$scope','$location','$rootScope','$state','$stateParams', 'authService','userService', function ($scope,$location,$rootScope,$state,$stateParams, authService, userService) {
    $scope.isAuthenticated = authService.isAuthenticated;
    $scope.auth={};
    $scope.user;
    $scope.alerts=[]
    $scope.resetPasswordEmailSent=false;
    $scope.authenticationErrorMessage="";
    $scope.alertMessages={
        generic:"Oh no! Something went wrong on our end, please try again!",
        unconfirmedUser:"Your account needs to be confirmed. An email has been sent to your email address to verify your account.",
        wrongCredentials:"Invalid username or password!",
        existingAccount: "An account already exists with that email address!",
        resetPasswordEmailSent:"An email has been sent to your email address with instructions on how to reset your account.",
        newAccountCreated:"Your account was successfully created! We have sent a verification email to you.Check your email to complete the registration process.",
        completeAllFields:"Please complete all fields before submitting"
    }
    
    $scope.login=function(){
     
    	authService.login($scope.auth).then(function(loginResponse){
    		//console.dir(loginResponse)
    		if(loginResponse.success){
                var user =  loginResponse.access_token.user
    			if(user.status == "C")
				{
    				//User is confirmed and need to be verified
                    $state.transitionTo('account.verify.start',{userId:user._id})
				}
                else if(user.status == "P" ){
                    //User is registered but not confirmed yet
                    $scope.alerts = [{
                        msg: $scope.alertMessages.unconfirmedUser,
                        type:'danger'
                    }];
                }
    			else 
				{
    				$state.transitionTo('account.home',{userId:user._id})
				}
    			
    		}
    		else{
                if(loginResponse.error.indexOf("TokenError: Invalid resource owner credentials")>=0)
                {
                    loginResponse.message = $scope.alertMessages.wrongCredentials
                }
    			$scope.alerts = [{
    				msg:loginResponse.message,
    				type:'danger'
    			}];
    		}
    	})    	
    }
    
    $scope.register=function(){
        $scope.user.status="P";
    	userService.save($scope.user, function(user){
    		if(angular.isDefined(user._id)){
    			//Successfully created the user go back to the login page
    			$state.transitionTo('noauth.login' ,{newAccount:$scope.user.email})  			
    		}
    		else
			{
    			var message =  $scope.alertMessages.generic
    		    if(user.code="11000")
		    	{
    		    	message = $scope.alertMessages.existingAccount  
		    	}
    			$scope.alerts=[
                    {
         				msg:message,
         				type:'danger'
         			}
                ]
			}
    	})
    	
    }

    $scope.resetPassword = function(){
        $scope.resetPasswordEmailSent=false;
        authService.reset($scope.auth.email).then(function(resetResponse){
            console.dir(resetResponse)
            if(resetResponse.data.success){
                 $scope.alerts = [{
                    msg: $scope.alertMessages.resetPasswordEmailSent,
                    type:'success'
                 }];
                 $scope.resetPasswordEmailSent=true;
                
            }
            else{

                 $scope.alerts = [{
                    msg:resetResponse.data.message,
                    type:'danger'
                 }];
            }
        }, function(failedResetResponse){
             $scope.alerts = [{
                    msg:failedResetResponse.data.error,
                    type:'danger'
                 }];

        })      

    }
        
    $scope.submitAttempt=function(){
    	$scope.submitted = true;
    	if(!$scope.loginReady()){
    		$scope.alerts=[{
        		type:'warning',
        		msg:$scope.alertMessages.completeAllFields
        	}]
    		
    	}
    }
    
    $scope.loginReady = function(){
    	if(($scope.loginForm.email.$valid  ) && ($scope.loginForm.password.$valid && $scope.loginForm.password.$dirty)){
    		return true
    	}
    	
    	return false;	
    }
    
    $scope.registerReady = function(){
    	if(($scope.registerForm.email.$valid && $scope.registerForm.email.$dirty) 
    			&&($scope.registerForm.password.$valid && $scope.registerForm.password.$dirty) 
    			&&($scope.registerForm.verifyPassword.$valid && $scope.registerForm.verifyPassword.$dirty)){
    		return true
    	}
    	return false;	
    }
    
    $scope.init=function(){
    	if($stateParams.newAccount)
		{
    		$scope.auth.email = $stateParams.newAccount
    		$scope.alerts=[{
        		type:'success',
        		msg:$scope.alertMessages.newAccountCreated
        	}]
		}
    }
    
    $scope.init();
    
  }]);

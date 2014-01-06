'use strict';

angular.module('elikyaMobileApp')
  	.service('authService',['$http','config','TokenHandler','Global','storage', function authService($http, config, TokenHandler, Global, localStorage) {
	  	var loginUrl = config.host  + config.port +'/oauth/token';
	   	var resetPasswordUrl = config.host +config.port  +"/" + config.api_base_version + '/users/reset';
	  	var session = {
			user:{}
	  	}
	  var isAuthenticated=false;
	  console.log("Auth Service URL: " + loginUrl)
	
	  var authServiceApi ={
		  	login:function(user){

		  		var payload = {
		          	username: user.email,
		          	password: user.password,
		          	grant_type: 'password',
		          	client_id: config.clientId,
		          	client_secret: config.clientSecret,
		          	redirect_uri:config.host,
		          	site:config.host 
		        };

			  	return $http.post(loginUrl, payload).then(function(response){
				  	if(response.data.access_token )
				  	{
					  	TokenHandler.set(response.data.access_token.token )
					  	response.data.success=true;
					  	window.user=response.data.access_token.user;
					  	localStorage.set(config.localStorageUserKey, response.data.access_token.user._id)
					  	$http.defaults.headers.common['Authorization'] = "Basic " + response.data.access_token.token;
				  	}
				  	
				  	return response.data
			  	},
			  	function(loginFailedResponse){
			  		loginFailedResponse.data.success=false;
			  		return loginFailedResponse.data;
			  	}); 
		  	},
		  	logout:function(){
		  		localStorage.set(config.localStorageUserKey, undefined)
				window.user= undefined;
			  	return  $http.put(loginUrl, user).success(function(){
			  	}); 
		  	},
		  	reset:function(userEmail){
			  	return  $http.post(resetPasswordUrl, {email:userEmail})
		  	},
		  	setSessionValue:function(key, value){
			  	session[key]=value;
		  	},
		  	getSession:function(){
			 	return session; 
		  	},
		  	isAuthenticated:function(){
			  	return Global.isSignedIn;
		  	}
	  }
	  return authServiceApi
  }]);


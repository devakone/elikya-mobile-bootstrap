'use strict';
moment().format();
angular.module('elikyaMobileApp', ['ngResource','config','ui.router','ui.bootstrap','snap','angularLocalStorage','underscore'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider,$httpProvider, $provide, envConfigs) {
	$locationProvider.html5Mode(false)
	// For any unmatched url, send to /login
	$urlRouterProvider.otherwise("/login") 
	  
	 $stateProvider
	  .state('noauth', {
          abstract:true,
          templateUrl: "/views/general.html",
         
      })
      .state('noauth.login', {
          url: "/login",
          parent:'noauth',
          templateUrl: "/views/partials/noauth/login.html",
          controller:"AuthenticationCtrl"
      })
      .state('noauth.register', {
        	url: "/register",
        	parent:'noauth',
        	templateUrl: "/views/partials/noauth/register.html",
        	controller:"AuthenticationCtrl"
      })
       .state('noauth.forgotPassword', {
          url: "/forgotPassword",
          parent:'noauth',
          templateUrl: "/views/partials/noauth/forgot_password.html",
          controller:"AuthenticationCtrl"
      })
      .state('account', {
          abstract:true,
          templateUrl: "/views/main.html",
      })
      .state('account.home', {
          url: "/account/:userId",
          templateUrl: "/views/partials/account/home.html",
          controller:"AccountCtrl",
          resolve:{
            user: function(userService, $stateParams, $q){
                var userPromise = $q.defer();
                var user = userService.get({id:$stateParams.userId}, function(user) {
                    userPromise.resolve(user);
                },function (errorData) {
                  userPromise.reject(errorData);
                });
                return userPromise.promise
            }
          }
      })
      .state('account.verify', {
          url: "/verify/:userId",
          abstract:true,
          views: {
            '':{ 
                templateUrl: "/views/partials/account/verify/verify.html",
                controller:"MainCtrl" 
            },
            'verificationWizard': { controller:"VerificationCtrl" },
          },
          resolve:{
            user: function(userService, $stateParams, $q){
                var userPromise = $q.defer();
                var user = userService.get({id:$stateParams.userId}, function(user) {
                    userPromise.resolve(user);
                },function (errorData) {
                  userPromise.reject(errorData);
                });
                return userPromise.promise
            }
          }
      })
      .state('account.verify.start', {
          url: "/start",
          views: {
            'verificationWizard': { templateUrl: "/views/partials/account/verify/start.html",controller:"VerificationCtrl"},
          },    
      })
      .state('account.verify.general', {
          url: "/general",
          views: {
            'verificationWizard': { templateUrl: "/views/partials/account/verify/general.html",controller:"VerificationCtrl"},
          },    
      })
      .state('account.verify.address', {
          url: "/address",
           views: {
            "verificationWizard": { templateUrl: "/views/partials/account/verify/address.html" ,controller:"VerificationCtrl"},
          },         
      })
      .state('account.verify.phone', {
          url: "/phone",
           views: {
            "verificationWizard": { templateUrl: "/views/partials/account/verify/phone.html" ,controller:"VerificationCtrl"},
          },         
      })
      .state('account.verify.complete', {
          url: "/complete",
          views: {
            "verificationWizard": { templateUrl: "/views/partials/account/verify/complete.html" ,controller:"VerificationCtrl"},
          },         
      })
      .state('account.settings', {
          url: "/settings",
          views: {
            "verificationWizard": { templateUrl: "/views/partials/account/verify/complete.html" ,controller:"VerificationCtrl"},
          },         
      })
      .state('account.dwolla', {
         url: "/dwolla/:userId",
          abstract:true,
           views: {
            '':{ 
                templateUrl: "/views/partials/account/dwolla/dwolla.html",
                controller:"MainCtrl" 
            },
            'dwollaWizard': { controller:"DwollaCtrl" },
          },
          resolve:{
            user: function(userService, $stateParams, $q){
                var userPromise = $q.defer();
                var user = userService.get({id:$stateParams.userId}, function(user) {
                    userPromise.resolve(user);
                },function (errorData) {
                  userPromise.reject(errorData);
                });
                return userPromise.promise
            }
          }    
      })
      .state('account.dwolla.start', {
          url: "/start",
          views: {
            'dwollaWizard': { 
              templateUrl: "/views/partials/account/dwolla/start.html" ,
              controller:"DwollaCtrl" 
            },
          }
         
      })
      .state('account.dwolla.general', {
          url: "/general",
          views: {
            'dwollaWizard': { templateUrl: "/views/partials/account/dwolla/general.html",controller:"DwollaCtrl"},
          },    
      })
      .state('account.profile', {
          url: "/account/:userId/profile",
          templateUrl: "/views/partials/account/profile.html",
      })
      .state('vestings', {
          abstract:true,
          templateUrl: "/views/main.html",
          controller:"VestingCtrl"
      })
      .state('vestings.create', {
          url: "/vestings/new",
          templateUrl: "/views/partials/vestings/create.html",    
      })
      .state('vestings.edit', {
          url: "/vestings/edit/:vestingId",
          templateUrl: "/views/partials/vestings/edit.html",    
      })
      .state('vestings.list', {
          url: "/vestings/list",
          templateUrl: "/views/partials/vestings/list.html",    
      })
      .state('timeline', {
          url: "/timeline",
          abstract:true,
          templateUrl: "/views/main.html",
          controller:"CommunityCtrl"
      })
      .state('search', {
          url: "/search",
          abstract:true,
          templateUrl: "/views/main.html",
          controller:"SearchCtrl"
      })
	

      var localhostRegex = /localhost/g
      var currentEnv = localhostRegex.test(window.location.hostname)?"dev":"prod"
      $provide.constant('config',envConfigs[currentEnv])
      
      //Allow CORS for AngularJS
      //$httpProvider.defaults.useXDomain = true;
     // delete $httpProvider.defaults.headers.common['X-Requested-With'];
      //Authentication interceptor
      var interceptor = ['$rootScope', '$q', function($rootScope, $q) {

        function success( response ) {
          return response
        };

        function error( response ) {
          if ( response.status == 401) {
            var deferred = $q.defer();
            $rootScope.$broadcast('event:unauthorized');
            return deferred.promise;
          };
          return $q.reject( response );
        };

        return function( promise ) {
          return promise.then( success, error );
        };

      }];
      $httpProvider.interceptors.push(['$rootScope', '$q','config','TokenHandler', function($rootScope, $q, appConfig, tokenHandler) {
        return {
          'request': function(config) {
            if(config.url.indexOf(appConfig.api_base_version) > 0)
            {
                  if(!config.params)
                  {
                    config.params = {}
                  }
                  config.params.access_token = tokenHandler.get()
            }
           
            return config || $q.when(config);
          },

          'response': function(response) {
            // Look for access token expired response
            return response || $q.when(response);
          },
          'responseError': function(response) {
            if ( response.status == 401) {
              var deferred = $q.defer();
              $rootScope.$broadcast('event:unauthorized');
              return deferred.promise;
            };
            return $q.reject( response );
          }
        };
      }]);

     // $httpProvider.innterceptors.push( interceptor );

      
  })
  .run(['$location','$http','$templateCache','$state','$stateParams','$rootScope','$q', 'config', 'TokenHandler','storage',function($location,$http,$templateCache,$state,$stateParams,$rootScope,$q, config, tokenHandler,localStorage){
	  //console.log("Going to " + $location.url()) 
	  //console.log("Configuration set to: ")
	   $http.defaults.useXDomain = true;
	   //Cache all my templates
	   // angular.forEach($route.routes, function(route) {
		  //   if (route.templateUrl) { 
		  //     $http.get(route.templateUrl, {cache: $templateCache});
		  //   }
		  // });
	  $rootScope.$state = $state;
	  $rootScope.$stateParams = $stateParams;
    $rootScope.$on('event:unauthorized', function(angularEvent) {
            $state.transitionTo('noauth.login');  
    });
    var userId = localStorage.get(config.localStorageUserKey);
    if(tokenHandler.get() && userId)
    {
        $http.defaults.headers.common['Authorization'] = "Basic " + tokenHandler.get();
        $state.transitionTo('account.home',{userId:userId})
    }
    else
    {
        $state.transitionTo('noauth.login');
       
    }
    
	  
  }]);



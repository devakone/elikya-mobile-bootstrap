'use strict';

angular.module('elikyaMobileApp')
  	.factory('userProfileService',['$resource','config','TokenHandler', function userProfileService($resource, config, tokenHandler) {
   		var userProfileServiceUrl = config.host +  ":port/" + config.api_base_version + '/users/:userId/profile';
   		var userProfileResource = $resource(userProfileServiceUrl,
        {
         		userId: "@_user",
         		port:config.port

     		},
        {
         
          get:{
            method:'GET',
            params:{
              userId:'@id'
            },
            isArray:false
          }

        }
    	);

   		userProfileResource = tokenHandler.wrapActions(userProfileResource,["get","query","update","save","me"]);
   		return userProfileResource;

  	}]);


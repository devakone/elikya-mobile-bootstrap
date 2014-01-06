'use strict';

angular.module('elikyaMobileApp')
  	.factory('userService',['$resource','config','TokenHandler', function userService($resource, config, tokenHandler) {
   		var userServiceUrl = config.host +  ":port/" + config.api_base_version + '/users/:id';
   		var userResource = $resource(userServiceUrl,
        {
         		id: "@id",
         		port:config.port

     		},
        {
          me:{
            action:'GET',
            params:{
              id:'@id'
            },
            url: config.host +  ":port/" + config.api_base_version + '/users/:id/show'
          },
          get:{
            method:'GET',
            params:{
              id:'@id'
            },
            isArray:false
          }

        }
    	);

   		userResource = tokenHandler.wrapActions(userResource,["get","query","update","save","me"]);
   		return userResource;

  	}]);


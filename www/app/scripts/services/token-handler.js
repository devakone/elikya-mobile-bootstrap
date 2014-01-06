
'use strict';

angular.module('elikyaMobileApp')
  .factory('TokenHandler', ['storage','config', function(localStorageService, config) {
    var tokenHandler = {};
    var token = undefined;
    var localStorageAccessTokenKey = "access-token"
     
    tokenHandler.set = function( newToken ) {
      token = newToken;
      localStorageService.set(config.localStorageKeyPrefix + localStorageAccessTokenKey, token)
    };
     
    tokenHandler.get = function() {
      return angular.isDefined(token)?token: localStorageService.get(config.localStorageKeyPrefix + localStorageAccessTokenKey, token);
    };

    tokenHandler.invalidate = function() {
        token = undefined;
        localStorageService.set(config.localStorageKeyPrefix + localStorageAccessTokenKey, token)
      
    };
     
    // wrap given actions of a resource to send auth token with every
    // request
    tokenHandler.wrapActions = function( resource, actions ) {
      // copy original resource
      var wrappedResource = resource;
      for (var i=0; i < actions.length; i++) {
      tokenWrapper( wrappedResource, actions[i] );
      };
      // return modified copy of resource
      return wrappedResource;
    };
     
    // wraps resource action to send request with auth token
    var tokenWrapper = function( resource, action ) {
      // copy original action
      resource['_' + action] = resource[action];
      // create new action wrapping the original and sending token
      resource[action] = function( data, success, error){
       
        return resource['_' + action](
        angular.extend({}, data || {}, {access_token: tokenHandler.get()}),success,error);
      };
    };
     
    return tokenHandler;
  }]);

'use strict';

angular.module('config', [])
	.constant('envConfigs',{
		dev:{
			host:"http://localhost",
			port:"\:4000",
			api_base_version:"api/v1",
			localStorageKeyPrefix:'dev-elk-local',
			localStorageUserKey:'dev-elk-local-user',
			clientId: 'RJb5fZfw7eERpRpc',
		    clientSecret: '7K4IfvUUvJkGWUUjD4cbHkf5bJgS1KlH',
		},
		prod:{
			host:"http://www.elikyapp.com",
			port:"",
			api_base_version:"api/v1",
			localStorageKeyPrefix:'prod-elk-local',
			localStorageUserKey:'prod-elk-local-user',
			clientId: 'RJb5fZfw7eERpRpc',
		}
	} )
;

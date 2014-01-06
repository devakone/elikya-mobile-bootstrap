'use strict';

angular.module('elikyaMobileApp')
  	.service('VerificationService', ['$http','config', function VerificationService($http, config) {
  		var userProfile={
        username:'akone',
        first_name:'Abou',
        last_name:'Kone',
        middle_initial:'D',
        address:'2400 Boston St',
        address2:'',
        city:'Baltimore',
        state:'MD',
        zip:20109,
        dob:'',
        phone_number:'2026157828',
      };
      //var userProfile={};
      var verificationUrlTemplate = new URITemplate(config.host  +config.port + "/" + config.api_base_version + '/users/{userId}/smsverificationtoken/{phone}/');
      var userProfileUrlTemplate = new URITemplate(config.host  +config.port + "/" + config.api_base_version + '/users/{userId}/profile/');
  		var verificationService = {
  			getUserProfile:function(){
  				return userProfile;
  			},
  			setGeneralInformation:function(generalInformation){
  				angular.extend(userProfile, generalInformation );
  			},
  			setAddressInformation:function(addressInformaton){
  				angular.extend(userProfile, addressInformaton );
  			},
  			setPhoneInformation:function(phoneInformation){
  				angular.extend(userProfile, phoneInformation );
  			},
        getSmsVerificationCode:function(smsRequest){
          var url =  verificationUrlTemplate.expand(smsRequest);
          return $http.get(url,{port:config.port});

        },
        verifyCode:function(verificationCode,userId){
          var url =  verificationUrlTemplate.expand({userId:userId});
          return $http.post(url,{code:verificationCode});

        }
       
  		}
  		return verificationService;

    	
}]);

'use strict';

describe('Controller: AuthenticationCtrl', function () {

  // load the controller's module
  beforeEach(module('elikyaMobileApp'));

  var AuthenticationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthenticationCtrl = $controller('AuthenticationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.vestings.length).toBe(3);
  });
});

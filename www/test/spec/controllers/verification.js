'use strict';

describe('Controller: VerificationCtrl', function () {

  // load the controller's module
  beforeEach(module('elikyaMobileApp'));

  var VerificationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VerificationCtrl = $controller('VerificationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

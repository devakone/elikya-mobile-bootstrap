'use strict';

describe('Controller: VestingCtrl', function () {

  // load the controller's module
  beforeEach(module('elikyaMobileApp'));

  var VestingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VestingCtrl = $controller('VestingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

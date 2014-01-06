'use strict';

describe('Controller: DwollaCtrl', function () {

  // load the controller's module
  beforeEach(module('elikyaMobileApp'));

  var DwollaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DwollaCtrl = $controller('DwollaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

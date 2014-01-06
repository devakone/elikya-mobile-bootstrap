'use strict';

describe('Directive: usStates', function () {

  // load the directive's module
  beforeEach(module('assetsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<us-states></us-states>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the usStates directive');
  }));
});

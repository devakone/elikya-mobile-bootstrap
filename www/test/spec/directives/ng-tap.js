'use strict';

describe('Directive: ngTap', function () {
  beforeEach(module('elikyaMobileApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<ng-tap></ng-tap>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the ngTap directive');
  }));
});

'use strict';

describe('Directive: backButton', function () {
  beforeEach(module('elikyaMobileApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<back-button></back-button>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the backButton directive');
  }));
});

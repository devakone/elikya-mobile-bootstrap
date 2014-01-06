'use strict';

describe('Service: wizard', function () {

  // load the service's module
  beforeEach(module('elikyaMobileApp'));

  // instantiate service
  var wizard;
  beforeEach(inject(function (_wizard_) {
    wizard = _wizard_;
  }));

  it('should do something', function () {
    expect(!!wizard).toBe(true);
  });

});

'use strict';

describe('Service: tokenHandler', function () {

  // load the service's module
  beforeEach(module('elikyaMobileApp'));

  // instantiate service
  var tokenHandler;
  beforeEach(inject(function (_tokenHandler_) {
    tokenHandler = _tokenHandler_;
  }));

  it('should do something', function () {
    expect(!!tokenHandler).toBe(true);
  });

});

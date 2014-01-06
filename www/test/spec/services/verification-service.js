'use strict';

describe('Service: VerificationService', function () {

  // load the service's module
  beforeEach(module('AssetsApp'));

  // instantiate service
  var VerificationService;
  beforeEach(inject(function (_VerificationService_) {
    VerificationService = _VerificationService_;
  }));

  it('should do something', function () {
    expect(!!VerificationService).toBe(true);
  });

});

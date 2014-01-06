'use strict';

describe('Service: apiService', function () {

  // load the service's module
  beforeEach(module('elikyaMobileApp'));

  // instantiate service
  var elikyApi;
  beforeEach(inject(function (_elikyApi_) {
    elikyApi = _elikyApi_;
  }));

  it('should do something', function () {
    expect(!!elikyApi).toBe(true);
  });

});

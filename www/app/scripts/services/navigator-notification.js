angular.module('elikyaMobileApp').service('NavigatorNotification', function($q, $window) {
  this.confirm = function(message, title, buttonLabels) {
    var defer = $q.defer();

    if (navigator.notification && navigator.notification.confirm) {
      var onConfirm = function(idx) {
        idx === 1 ? defer.resolve() : defer.reject()
      }

      navigator.notification.confirm(message, onConfirm, title, buttonLabels)
    } else {
      $window.confirm(message) ? defer.resolve() : defer.reject()
    }

    return alertPromise(defer.promise)
  }
})

function alertPromise(promise) {
  promise.ok = function(fn) {
    promise.then(function() {
      fn.apply(this, arguments)
    })
    return promise
  }

  promise.cancel = function(fn) {
    promise.then(null, function() {
      fn.apply(this, arguments)
    })
    return promise
  }

  return promise
}

/*
alerts.confirm('Do you want to punch bozo?', 'Punch him?', ['Punch Bozo', "No, I'm a Weeny"])
.ok(function(){
  // => bozo punched
})
.cancel(function() {
  // => ya, Bozo scares me too, not punched.
})

*/
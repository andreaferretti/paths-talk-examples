(function() {
  var app = angular.module('paths', []);

  function zeroes(n) {
    var result = new Array(n);
    for (var i = 0; i < n; i++) { result[i] = 0; }

    return result;
  }

  app.controller('PathCtrl', function($scope, $interval) {
    var xs = zeroes(100), ys = zeroes(100);

    $interval(function() {
      xs.shift();
      xs.push(mousex);
      ys.shift();
      ys.push(mousey);

      var xs_ = xs.map(function(x, i) { return [i, x]; });
      var ys_ = ys.map(function(y, i) { return [i, y]; });

      $scope.graph = paths.SmoothLine({
        width: 400,
        height: 400,
        data: [xs_, ys_]
      });
    }, 16);
  });
})();
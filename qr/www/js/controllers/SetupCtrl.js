qr.controller('SetupCtrl', function($scope, mainService) {

    $scope.set = function(info) {
        $scope.info = {};
        mainService.set(info);
    }

})

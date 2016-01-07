qr.controller('LoginCtrl', function($scope, mainService) {
    
    $scope.passCheck = function(password) {
        mainService.checkPass(password);
    }

});

qr.controller('DashCtrl', function($scope, mainService, $cordovaBarcodeScanner, $ionicPlatform) {

    $scope.description = mainService.getDescript();

    mainService.registerListener(function(newDesc){
        $scope.description = newDesc;
        $scope.$apply();
    })

    var qrData = '';

    $scope.scanBarcode = function(){
         $ionicPlatform.ready(function() {
            $cordovaBarcodeScanner.scan().then(function(barcodeData) {
                qrData = JSON.stringify(barcodeData.text);
                myQrData = qrData.replace(/^"(.+(?="$))"$/, '$1');
                mainService.lookup(myQrData);
            }, function(error) {
               alert(JSON.stringify(error));
            });
         });
     }
});

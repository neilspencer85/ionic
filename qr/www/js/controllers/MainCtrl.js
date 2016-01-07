qr.controller('MainCtrl', function($scope, $cordovaBarcodeScanner, mainService, $ionicPlatform) {

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

    //  For testing purposes on the web...
    //
    // $scope.test = function(node) {
    //     console.log('node', $scope.node);
    //     myQrData = node.replace(/^"(.+(?="$))"$/, '$1');
    //     $scope.node = "";
    //     console.log('node', $scope.node);
    //     mainService.lookup(myQrData);
    // }

});

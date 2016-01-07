qr.service('mainService', function($firebaseArray, $firebaseObject, $state, $ionicPopup) {

    var fireRef = new Firebase('https://my-key-management.firebaseio.com/guids/');

    this.lookup = function(myQrData) {

        fireRef = new Firebase('https://my-key-management.firebaseio.com/guids/' + myQrData);

        fireRef.once('value', function(snapshot) {
            var node = snapshot.exists();
            if (node) {
                if (snapshot.child('password').exists()) {
                    $state.go('login');
                } else {
                    $state.go('setup')
                }
            } else {
                $ionicPopup.alert({
                    title: 'Alert',
                    template: "There seems to be a problem with the QR Code... Please scan again."
                });
            }
        })
    }

    var qrDescript = '';

    this.checkPass = function(password) {
        fireRef.child('password').once("value", function(snapshot) {
            var pass = snapshot.val();
            if(password === pass) {
                fireRef.child('description').once('value', function(snapshot) {
                    qrDescript = snapshot.val();
                    if(listener){
                        listener(qrDescript);
                    }
                    $state.go('dash');
                });
            } else {
                $ionicPopup.alert({
                    title: 'Alert',
                    template: 'Password does not match, Please try again.'
                });
            }
        });
    };

    this.getDescript = function() {
        return qrDescript;
    }

    this.set = function(info) {
            fireRef.set({
                'password': info.password,
                'description': info.description
            });
            $ionicPopup.alert({
                title: 'Success!',
                template: 'Your all setup and ready to go!'
            });
            $state.go('main');
    }

    var listener = null;
    this.registerListener = function(callbackFn){
        listener = callbackFn;
    }

});





// Luis Zombie Code
// This is the lookup() before alterations and changing views.. use for reference
// this.lookup = function(myQrData) {
//
//     fireRef = new Firebase('https://qr-keys.firebaseio.com/guids/' + myQrData);
//
//     fireRef.once('value', function(snapshot) {
//         var node = snapshot.exists();
//         alert("Line 17 service " + node);
//         if (node) {
//             if (snapshot.child('password').exists()) {
//                 alert("Whats the magic word")
//             } else {
//                 alert("Not quite set up yet...")
//                 fireRef.set({
//                     'password': 'yo',
//                     'description': 'This is to the front gate, Penthouse 7'
//                 });
//             }
//             alert("Yay! you are on the right track!");
//         } else {
//             alert("Sorry wrong qr code");
//         }
//     })
// }

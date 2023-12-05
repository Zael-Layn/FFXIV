(function(){
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
        callbacks:  {
            signInSuccess: function(currentUser, credential, redirectUrl) {
                return true;
            },
            uiShown: function() {
                document.getElementById('loader').style.display = 'none';
            }
        },
        signInFlow: 'popup',
        signInSuccessUrl: 'index.html',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
    };

    ui.start('#firebaseui-auth-container', uiConfig);
})()
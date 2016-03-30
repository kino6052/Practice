var myRef = new Firebase("https://torrid-torch-3843.firebaseio.com");
var chatRef = new Firebase("https://torrid-torch-3843.firebaseio.com/messages");
var authRef = new Firebase("https://torrid-torch-3843.firebaseio.com/.info/authenticated");

var EMAIL = '';

chatRef/*.orderByChild('name').equalTo('email@email.com')*/.on("child_added", function(snap) {
   displayMessages(snap); 
});

var sendMessage = function(message){
  // TODO: Finish the function
  chatRef.push({name: getEmail(), text: message});
}

var displayMessages = function(snap){
  if (snap.val()) {
        //alert("Child Added");
        $('#messages').append('<li>' + JSON.stringify(snap.val()) + '</li>')
    } else {
        //alert("Child not Added?");
    }
}

var getEmail = function() {
    var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
        if (error) {
            // an error occurred while attempting login
            EMAIL = '';
        } else if (user) {
            $("#username").text(user.email);
            EMAIL = user.email;

        } else {
            $("#username").text('');
            EMAIL = '';
        }
    })
    return EMAIL;
};

var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
    if (error) {
        // an error occurred while attempting login
        alert(error);
    } else if (user) {
        // user authenticated with Firebase
        getEmail();

    } else {
        // user is logged out
    }
})

var login = function(email, password) {
    authClient
        .login('password', {
            email: email,
            password: password
        });
}

var logout = function(){
    authClient
        .logout();
}

$(document).ready(function() {
    //console.log($("#test").text("test"));
})
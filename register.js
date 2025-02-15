// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value;
    const pin = document.getElementById('pin').value;
    const reEnterPin = document.getElementById('reEnterPin').value;
    const userType = document.getElementById('userType').value;

    if (pin !== reEnterPin) {
        alert('PIN and Re-enter PIN do not match.');
        return;
    }

    // You can add Firebase authentication and database operations here
    firebase.auth().createUserWithEmailAndPassword(phone + "@domain.com", pin)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            alert('Registration successful!');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Registration failed: ' + errorMessage);
            console.error('Error:', error);
        });
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkLG-6Ze8TxKFt7gRnSbcxe1YY8tOhkpY",
    authDomain: "drivers-5e2b3.firebaseapp.com",
    projectId: "drivers-5e2b3",
    storageBucket: "drivers-5e2b3.firebasestorage.app",
    messagingSenderId: "343394512517",
    appId: "1:343394512517:web:24039feda802ab3f8bc3ec",
    measurementId: "G-XE0GXK81JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value;
    const pin = document.getElementById('pin').value;
    const reEnterPin = document.getElementById('reEnterPin').value;
    const userType = document.getElementById('userType').value;

    if (pin !== reEnterPin) {
        alert('PIN and Re-enter PIN do not match.');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, phone + "@domain.com", pin);
        const user = userCredential.user;

        // Add user details to Firestore
        const commonData = {
            phone: phone,
            userType: userType,
        };

        if (userType === 'driver') {
            // Store user data in the 'drivers' collection
            await setDoc(doc(db, "drivers", user.uid), {
                ...commonData,
                available: true, // 'available' field only for drivers
            });
        } else {
            // Store user data in the 'carowners' collection
            await setDoc(doc(db, "carowners", user.uid), commonData);
        }

        alert('Registration successful!');
        // Redirect to login or home page
        window.location.href = 'index.html';
    } catch (error) {
        alert('Registration failed: ' + error.message);
        console.error('Error:', error);
    }
});

document.getElementById('loginButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

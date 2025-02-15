<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed: ' + error.message);
      console.error('Error:', error);
    }
  });
</script>

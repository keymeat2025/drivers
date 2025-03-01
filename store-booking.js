// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
document.getElementById('bookingForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const bookingDetails = {
        pickupLocation: document.getElementById('pickupLocation').value,
        dropoffLocation: document.getElementById('dropoffLocation').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        carType: document.getElementById('carType').value,
        userName: localStorage.getItem('userName')
    };

    try {
        await addDoc(collection(db, 'bookings'), bookingDetails);
        alert('Booking successful!');
    } catch (error) {
        console.error('Error adding document: ', error);
        alert('Booking failed!');
    }
});

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import necessary functions


// Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const bookingDetails = {
        pickupLocation: document.getElementById('pickupLocation').value,
        dropoffLocation: document.getElementById('dropoffLocation').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        carType: document.getElementById('carType').value,
        userName: localStorage.getItem('userName')
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    db.collection('bookings').add(bookingDetails)
        .then(() => {
            alert('Booking successful!');
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
            alert('Booking failed!');
        });
});

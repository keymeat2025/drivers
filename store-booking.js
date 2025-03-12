// Import necessary Firebase functions
// { initializeApp } from "firebase/app";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('bookingForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    console.log('Form submission event triggered');

    const bookingDetails = {
        pickupLocation: document.getElementById('pickupLocation').value,
        dropoffLocation: document.getElementById('dropoffLocation').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        carType: document.getElementById('carType').value,
        userName: localStorage.getItem('userName')
    };

    console.log('Booking details:', bookingDetails);

    try {
        const docRef = await addDoc(collection(db, 'bookings'), bookingDetails);
        console.log('Document written with ID: ', docRef.id);
        alert('Booking successful!');
    } catch (error) {
        console.error('Error adding document: ', error);
        alert('Booking failed!');
    }

  // store-booking.js (after storing booking details)

import { assignDrivers } from './assign-driver.js';

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
        const docRef = await addDoc(collection(db, 'bookings'), bookingDetails);
        console.log('Document written with ID: ', docRef.id);
        alert('Booking successful!');
        
        // Assign drivers to the trip
        await assignDrivers(docRef.id, bookingDetails);
    } catch (error) {
        console.error('Error adding document: ', error);
        alert('Booking failed!');
    }
});

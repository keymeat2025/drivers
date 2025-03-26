import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, setDoc, runTransaction } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Mock function to send SMS
function sendSMS(phoneNumber, message) {
    console.log(`SMS sent to ${phoneNumber}: ${message}`);
}

export async function assignDriver(pickupLatLng, dropoffLatLng, distance, userName, userPhoneNumber, adminPhoneNumber) {
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Check if the user is a car owner
    if (localStorage.getItem('userType') !== 'carowner') {
        errorMessage.innerText = "Only car owners can book a driver.";
        return;
    }

    // Check if the distance is more than 5 km
    if (distance <= 5) {
        errorMessage.innerText = "The trip distance must be more than 5 km.";
        return;
    }

    // Check if within Tamil Nadu, India (using approximate bounding box)
    const tamilNaduBounds = L.latLngBounds(
        L.latLng(8.0689, 76.1835), // Southwest corner
        L.latLng(13.2312, 80.3585) // Northeast corner
    );
    if (!tamilNaduBounds.contains(pickupLatLng) || !tamilNaduBounds.contains(dropoffLatLng)) {
        errorMessage.innerText = "The trip must be within Tamil Nadu, India.";
        return;
    }

    try {
        await runTransaction(db, async (transaction) => {
            // Generate a booking ID and create a booking document
            const bookingId = userName + '_' + Date.now();
            const bookingRef = doc(db, "bookings", bookingId);
            transaction.set(bookingRef, {
                pickupLatLng: pickupLatLng,
                dropoffLatLng: dropoffLatLng,
                distance: distance,
                userName: userName,
                status: "pending"
            });

            // Query to get available drivers
            const q = query(collection(db, "drivers"), where("available", "==", true));
            const querySnapshot = await getDocs(q);
            const availableDrivers = [];
            querySnapshot.forEach((driverDoc) => {
                availableDrivers.push(driverDoc.id);
            });

            if (availableDrivers.length === 0) {
                errorMessage.innerText = "No available drivers at the moment. We will inform you once a driver is available.";
                sendSMS(userPhoneNumber, "No available drivers at the moment. We will inform you once a driver is available.");
                sendSMS(adminPhoneNumber, "No available drivers at the moment.");
                return;
            }

            // Assign the first available driver
            const assignedDriverId = availableDrivers[0];
            const driverRef = doc(db, "drivers", assignedDriverId);
            transaction.update(driverRef, { available: false, currentBooking: bookingId });

            // Update booking with assigned driver details
            transaction.update(bookingRef, { driverId: assignedDriverId, status: "driver_assigned" });

            // Record the scheduled list for tracking status
            const scheduleRef = doc(db, "schedules", bookingId);
            transaction.set(scheduleRef, {
                bookingId: bookingId,
                driverId: assignedDriverId,
                status: "scheduled"
            });

            // Send confirmation messages
            sendSMS(userPhoneNumber, "Your driver has been assigned.");
            sendSMS(assignedDriverId, "You have been assigned a new booking.");
            sendSMS(adminPhoneNumber, "A driver has been assigned to a new booking.");
            
            successMessage.innerText = `Driver ${assignedDriverId} has been assigned to your request.`;
            console.log("Driver assigned and messages sent.");
        });

    } catch (error) {
        console.error("Error booking driver:", error);
        errorMessage.innerText = error.message || "Failed to book a driver. Please try again.";
    }
}

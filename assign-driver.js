import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Function to assign drivers to a trip
async function assignDrivers(bookingId, bookingDetails) {
    const db = getFirestore();

    // Query to get available drivers
    const q = query(collection(db, "drivers"), where("status", "==", "available"));

    const querySnapshot = await getDocs(q);
    const availableDrivers = [];
    querySnapshot.forEach((driverDoc) => {
        availableDrivers.push(driverDoc.id);
    });

    if (availableDrivers.length === 0) {
        console.log("No available drivers");
        return;
    }

    // Assign the first available driver
    const assignedDriverId = availableDrivers[0];
    const driverRef = doc(db, "drivers", assignedDriverId);
    await updateDoc(driverRef, { status: "assigned", currentBooking: bookingId });

    // Update booking with assigned driver details
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, { driverId: assignedDriverId, status: "driver_assigned" });

    // Send confirmation messages (assuming you have a function sendMessage)
    sendMessage(bookingDetails.userName, "Your driver has been assigned.");
    sendMessage("admin@example.com", "A driver has been assigned to a new booking.");

    console.log("Driver assigned and messages sent.");
}

// Mock function to send messages
function sendMessage(recipient, message) {
    console.log(`Message sent to ${recipient}: ${message}`);
}

export { assignDrivers };

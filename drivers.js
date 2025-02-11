// drivers.js
const express = require('express');
const app = express();
const port = 3000;

// Mock data for drivers
const drivers = [
    { id: 1, name: 'Driver A', location: 'Location A', available: true },
    { id: 2, name: 'Driver B', location: 'Location B', available: false },
    { id: 3, name: 'Driver C', location: 'Location C', available: true },
];

app.get('/api/drivers', (req, res) => {
    const { startLocation } = req.query;
    // Filter drivers based on availability and proximity to start location
    const availableDrivers = drivers.filter(driver => driver.available && driver.location === startLocation);
    res.json(availableDrivers);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/routes');

// require('dotenv').config();
// const app = express();

// app.use(cors());
// app.use(express.json()); // Parse JSON requests

// app.use('/api/auth', authRoutes); // Auth routes

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());  // Middleware to parse JSON requests

// Serve static files (CSS, JS, Images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes from 'routes/authRoutes.js'
const authRoutes = require('./routes/routes');

// Use the routes for handling registration and login
app.use('/', authRoutes);  // Use routes from 'authRoutes.js' for /login and /register

// Serve the login page when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

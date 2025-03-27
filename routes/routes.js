const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { register, login, logout } = require('../controllers/auth');
const { adminDashboard, tenantDashboard, landlordDashboard } = require('../controllers/dashboard');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// Protect the dashboard routes with the token verification middleware
router.get('/admin-dashboard', verifyToken, adminDashboard);
router.get('/tenant-dashboard', verifyToken, tenantDashboard);
router.get('/landlord-dashboard', verifyToken, landlordDashboard);

module.exports = router;


module.exports = router;

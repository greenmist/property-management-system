const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { register, login, logout } = require('../controllers/auth');
const { adminDashboard, tenantDashboard, landlordDashboard } = require('../controllers/dashboard');
const { getAllUsers, deleteUser } = require('../controllers/users');
const { createProperty, getProperties, updateProperty, deleteProperty, getAllProperties , createAdminProperty} = require('../controllers/property');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// Protect the dashboard routes with the token verification middleware
router.get('/admin-dashboard', verifyToken, adminDashboard);
router.get('/tenant-dashboard', verifyToken, tenantDashboard);
router.get('/landlord-dashboard', verifyToken, landlordDashboard);

router.get('/manage-users/view-users',verifyToken, getAllUsers);
router.delete('/manage-users/delete-user/:id',verifyToken, deleteUser);

router.get('/manage-properties/view-property',verifyToken, getProperties);
router.post('/manage-properties/add-property',verifyToken, createProperty);
router.put('/manage-properties/update-property/:id', updateProperty);
router.delete('/manage-properties/delete-property/:id', deleteProperty);

router.get('/manage-properties/view-all-property',verifyToken, getAllProperties);
router.post('/manage-properties/add-admin-property',verifyToken, createAdminProperty);

module.exports = router;


module.exports = router;

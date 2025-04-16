const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { register, login, logout } = require('../controllers/auth');
const { adminDashboard, tenantDashboard, landlordDashboard } = require('../controllers/dashboard');
const { getAllUsers, deleteUser } = require('../controllers/users');
const { createProperty, getProperties, updateProperty, deleteProperty, getAllProperties , createAdminProperty, getFilterProperties} = require('../controllers/property');
const { getMaintenanceRequests, updateMaintenanceRequest, deleteMaintenanceRequest, getAllMaintenanceRequests} = require('../controllers/maintenance');
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
router.post('/manage-users/add-user',verifyToken, register);

router.get('/manage-properties/view-property',verifyToken, getProperties);
router.post('/manage-properties/add-property',verifyToken, createProperty);
router.put('/manage-properties/update-property/:id', updateProperty);
router.delete('/manage-properties/delete-property/:id', deleteProperty);

router.get('/manage-properties/view-all-property',verifyToken, getAllProperties);
router.post('/manage-properties/add-admin-property',verifyToken, createAdminProperty);


// Routes for maintenance requests
router.get('/maintenance/view-requests', verifyToken, getMaintenanceRequests);
// router.post('/maintenance/create', verifyToken, createMaintenanceRequest);
router.put('/maintenance/update/:id', verifyToken, updateMaintenanceRequest);
router.delete('/maintenance/delete/:id', verifyToken, deleteMaintenanceRequest);
router.get('/maintenance/view-all-requests', verifyToken, getAllMaintenanceRequests);

router.get('/properties/reports/:status', verifyToken, getFilterProperties);

module.exports = router;


module.exports = router;

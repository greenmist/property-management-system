const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { register, login, logout } = require('../controllers/auth');
const { adminDashboard, tenantDashboard, landlordDashboard } = require('../controllers/dashboard');
const { getAllUsers, deleteUser } = require('../controllers/users');
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

// router.post('/', propertyController.createProperty);
// router.get('/', propertyController.getProperties);
// router.put('/:id', propertyController.updateProperty);
// router.delete('/:id', propertyController.deleteProperty);


module.exports = router;

const path = require('path');

// Handle the Admin Dashboard
const adminDashboard = (req, res) => {
    if (req.session.role !== 'admin') {
        return res.redirect('/');
    }

    res.sendFile(path.join(__dirname, '../public', 'admin-dashboard.html'));
};

// Handle the Tenant Dashboard
const tenantDashboard = (req, res) => {
    if (req.session.role !== 'tenant') {
        return res.redirect('/');
    }

    res.sendFile(path.join(__dirname, '../public', 'tenant-dashboard.html'));
};

// Handle the Landlord Dashboard
const landlordDashboard = (req, res) => {
    if (req.session.role !== 'landlord') {
        return res.redirect('/');
    }

    res.sendFile(path.join(__dirname, '../public', 'landlord-dashboard.html'));
};

module.exports = { adminDashboard, tenantDashboard, landlordDashboard };

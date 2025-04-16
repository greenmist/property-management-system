const db = require('../config/db');

// Get all maintenance requests (for landlord/admin to view)
exports.getMaintenanceRequests = async (req, res) => {
    console.log("Fetching maintenance requests");
    const userId = req.user.id;
    try {
        const [requests] =await db.query(
            `SELECT m.*, p.OwnerID
            FROM Maintenance m
            JOIN Properties p ON m.PropertyID = p.id
            WHERE p.OwnerID = ?`, [userId]);
        res.json(requests);
    } catch (err) {
        console.error("Error fetching maintenance requests:", err);
        res.status(500).json({ error: "Failed to fetch maintenance requests" });
    }
};

// Update the status of a maintenance request (for landlord/admin)
exports.updateMaintenanceRequest = (req, res) => {
    const id = req.params.id; // Property ID
    const status = req.body.status; // Status of the maintenance request
    const assignedTo = req.body.assignedTo; // Assigned user (optional)

    let query;
    const params = [status]; // Start with the status as the first parameter

    if (status === "Resolved") {
        query = 'UPDATE Maintenance SET Status = ?, ResolvedAt = NOW()';
    } else {
        query = 'UPDATE Maintenance SET Status = ?';
    }

    // Add assignedTo to the query and parameters if it has a value
    if (assignedTo) {
        query += ', AssignedTo = ?';
        params.push(assignedTo); // Add assignedTo to the parameters
    }

    query += ' WHERE PropertyID = ?';
    params.push(id); // Add the PropertyID to the parameters
    // Execute the query
    db.query(query, params, (err) => {
        if (err) {
            console.error("Error updating maintenance request:", err);
            return res.status(500).json(err);
        }
        res.json({ message: 'Maintenance request updated successfully' });
    });
};

// Delete a maintenance request (for landlord/admin)
exports.deleteMaintenanceRequest = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Maintenance WHERE PropertyID = ?';

    db.query(query, [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Maintenance request deleted successfully' });
    });
};

exports.getAllMaintenanceRequests = async (req, res) => {
    console.log("Fetching maintenance requests");
    try {
        const [requests] =await db.query(
           `SELECT m.*, p.OwnerID, u.name
             FROM Maintenance m
             JOIN Properties p ON m.PropertyID = p.id
             JOIN users u ON p.OwnerID = u.id`);
        res.json(requests);
    } catch (err) {
        console.error("Error fetching maintenance requests:", err);
        res.status(500).json({ error: "Failed to fetch maintenance requests" });
    }
};

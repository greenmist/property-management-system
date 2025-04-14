const path = require('path');
const db = require('../config/db');

exports.createProperty = (req, res) => {
    console.log("Creating property");
    const { Address, Type, RentAmount, Status, Description } = req.body;
    const OwnerID = req.user.id; // Access the user's ID from the token
    const query = 'INSERT INTO Properties (OwnerID, Address, Type, RentAmount, Status, Description) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [OwnerID, Address, Type, RentAmount, Status, Description], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
    });
};

exports.getProperties = async (req, res) => {
    const OwnerID = req.user.id; // Access the user's ID from the token
    console.log("Creating property", OwnerID);
    try {
        const [results] = await db.query('SELECT * FROM Properties WHERE OwnerID = ?', [OwnerID]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No properties found' });
        }
        res.json(results);
    } catch (err) {
        console.error("Error fetching properties:", err);
        res.status(500).json({ error: "Failed to fetch properties" });
    }
};

exports.getAllProperties = async (req, res) => {
    const OwnerID = req.user.id; // Access the user's ID from the token
    console.log("Creating property", OwnerID);
    try {
        const [results] = await db.query('SELECT * FROM Properties');
        if (results.length === 0) {
            return res.status(404).json({ message: 'No properties found' });
        }
        res.json(results);
    } catch (err) {
        console.error("Error fetching properties:", err);
        res.status(500).json({ error: "Failed to fetch properties" });
    }
};

exports.updateProperty = (req, res) => {
    const { id } = req.params; // Extract the property ID from the URL
    const { location, price, status } = req.body; // Extract the fields from the request body

    // Validate that at least one field is provided
    if (!location && !price && !status) {
        return res.status(400).json({ error: 'At least one field must be provided to update' });
    }

    // Build the query dynamically based on the provided fields
    let query = 'UPDATE Properties SET';
    const fields = [];
    const values = [];

    if (location) {
        fields.push(' Address = ?');
        values.push(location);
    }
    if (price) {
        fields.push(' RentAmount = ?');
        values.push(price);
    }
    if (status) {
        fields.push(' Status = ?');
        values.push(status);
    }

    query += fields.join(',') + ' WHERE id = ?';
    values.push(id); // Add the ID to the values array

    // Execute the query
    db.query(query, values, (err) => {
        if (err) {
            console.error('Error updating property:', err);
            return res.status(500).json({ error: 'Failed to update property' });
        }
        res.json({ message: 'Property updated successfully' });
    });
};

exports.deleteProperty = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Properties WHERE id=?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Property deleted' });
    });
};

exports.createAdminProperty = (req, res) => {
    console.log("Creating property");
    const { OwnerID, Address, Type, RentAmount, Status, Description } = req.body;
    const query = 'INSERT INTO Properties (OwnerID, Address, Type, RentAmount, Status, Description) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [OwnerID, Address, Type, RentAmount, Status, Description], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
    });
};
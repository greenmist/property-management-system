const path = require('path');
const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM users');
        if (results.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(results);
    } catch (err) {
        console.error("Error fetching user details:", err);
        res.status(500).json({ error: "Failed to fetch user details" });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Failed to delete user" });
    }
}

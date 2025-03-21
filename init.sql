-- Create the database (if it doesn’t exist)
CREATE DATABASE IF NOT EXISTS property_management;

-- Use the database
USE property_management;

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'tenant', 'landlord') NOT NULL DEFAULT 'tenant',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a sample user (optional)
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Admin User', 'admin@example.com', 'hashed_password_here', 'admin');

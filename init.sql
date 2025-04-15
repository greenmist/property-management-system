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
    role ENUM('admin', 'landlord') NOT NULL DEFAULT 'landlord',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

-- Insert a sample user (optional)
-- INSERT INTO users (name, email, password_hash, role) 
-- VALUES ('Admin User', 'admin@example.com', 'hashed_password_here', 'admin');

CREATE TABLE IF NOT EXISTS Properties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    OwnerID INT NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Type ENUM('Apartment', 'House', 'Studio', 'Office') NOT NULL,
    RentAmount DECIMAL(10,2) NOT NULL,
    Status ENUM('Available', 'Rented') NOT NULL,
    Description VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DeletedAt TIMESTAMP NULL,
    FOREIGN KEY (OwnerID) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS Maintenance (
    RequestID INT AUTO_INCREMENT PRIMARY KEY,
    TenantID INT NOT NULL,
    PropertyID INT NOT NULL,
    Description TEXT NOT NULL,
    Status ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending' NOT NULL,
    AssignedTo INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ResolvedAt TIMESTAMP NULL,
    FOREIGN KEY (PropertyID) REFERENCES Properties(id)
);
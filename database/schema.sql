-- Create database
CREATE DATABASE IF NOT EXISTS company_management;
USE company_management;

-- Users table for OAuth authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    github_id VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    company_id INT NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    INDEX idx_company (company_id),
    INDEX idx_name (first_name, last_name)
);

-- Insert sample data (optional)
INSERT INTO companies (name, email, address, website) VALUES
('FNXPERTS SDN BHD', 'info@fnxperts.com', 'Kuala Lumpur, Malaysia', 'https://fnxperts.com'),
('Tech Solutions Inc', 'contact@techsolutions.com', 'Singapore', 'https://techsolutions.com'),
('Digital Agency Co', 'hello@digitalagency.com', 'Penang, Malaysia', 'https://digitalagency.com');

INSERT INTO employees (first_name, last_name, company_id, email, phone) VALUES
('John', 'Doe', 1, 'john.doe@fnxperts.com', '+60123456789'),
('Jane', 'Smith', 1, 'jane.smith@fnxperts.com', '+60198765432'),
('Michael', 'Johnson', 2, 'michael@techsolutions.com', '+6587654321'),
('Sarah', 'Williams', 3, 'sarah@digitalagency.com', '+60145678901');
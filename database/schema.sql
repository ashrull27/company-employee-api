-- Create database (if using psql directly)
-- CREATE DATABASE company_management;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    github_id VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for companies
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(name);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    email VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for employees
CREATE INDEX IF NOT EXISTS idx_employees_company ON employees(company_id);
CREATE INDEX IF NOT EXISTS idx_employees_name ON employees(first_name, last_name);

-- Insert sample data
INSERT INTO companies (name, email, address, website) VALUES
('FNXPERTS SDN BHD', 'info@fnxperts.com', 'Kuala Lumpur, Malaysia', 'https://fnxperts.com'),
('Tech Solutions Inc', 'contact@techsolutions.com', 'Singapore', 'https://techsolutions.com'),
('Digital Agency Co', 'hello@digitalagency.com', 'Penang, Malaysia', 'https://digitalagency.com');

INSERT INTO employees (first_name, last_name, company_id, email, phone) VALUES
('John', 'Doe', 1, 'john.doe@fnxperts.com', '+60123456789'),
('Jane', 'Smith', 1, 'jane.smith@fnxperts.com', '+60198765432'),
('Michael', 'Johnson', 2, 'michael@techsolutions.com', '+6587654321'),
('Sarah', 'Williams', 3, 'sarah@digitalagency.com', '+60145678901');
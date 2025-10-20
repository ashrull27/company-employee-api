# Company-Employee Management API

A RESTful API for managing companies and employees with GitHub OAuth authentication built with Node.js, Express, and PostgreSQL.

## Features

- GitHub OAuth 2.0 Authentication
- JWT Token Management
- Company Management (CRUD Operations)
- Employee Management (CRUD Operations)
- Pagination Support
- PostgreSQL Database using DBeaver
- Express.js REST API
- Input Validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL, DBeaver
- **Authentication**: GitHub OAuth 2.0 + JWT
- **Validation**: express-validator
- **Security**: Helmet, CORS

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- GitHub Account with OAuth App configured

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/ashrull27/company-employee-api.git
cd company-employee-api
npm install
```

### 2. Create Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=company_management
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=24h

# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=https://your-backend-url/api/auth/github/callback

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-url
```

### 3. Setup Database

Install DBeaver
Create PostgreSQL database in DVbeaver and establish the connection to Render:

Then copy and run the SQL from `database/schema.sql`.

### 4. Run Application

```bash
npm start
```

Server will run on [`//your-frontend-url](https://your-frontend-url)](https://your-frontend-url)`

## Deployment (Render)

### 1. Push to GitHub

```bash
git add .
git commit -m "Deploy to Render"
git push origin main
```

### 2. Create Render Account

Visit https://render.com and sign up with GitHub.

### 3. Create PostgreSQL Database

- Click "New +" → "PostgreSQL"
- Configure and create
- Save connection details

### 4. Create Web Service

- Click "New +" → "Web Service"
- Connect GitHub repository
- Configure:
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Add all environment variables from `.env`
  - Select Free tier

### 5. Deploy

Render will automatically deploy your application.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/github` | Initiate GitHub OAuth login |
| GET | `/api/auth/github/callback` | OAuth callback endpoint |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user info |

### Companies

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/api/companies` | Get paginated companies | Yes |
| GET | `/api/companies/:id` | Get single company | Yes |
| POST | `/api/companies` | Create company | Yes |
| PUT | `/api/companies/:id` | Update company | Yes |
| DELETE | `/api/companies/:id` | Delete company | Yes |

### Employees

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/api/employees` | Get paginated employees | Yes |
| GET | `/api/employees/:id` | Get single employee | Yes |
| POST | `/api/employees` | Create employee | Yes |
| PUT | `/api/employees/:id` | Update employee | Yes |
| DELETE | `/api/employees/:id` | Delete employee | Yes |

## License

MIT License - feel free to use this project for your own purposes.

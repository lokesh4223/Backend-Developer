# Getting Started Guide

This guide will help you quickly set up and run the complete Task Manager application.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance)
- Git (optional, for version control)

## Quick Setup

### Option 1: Automated Setup (Recommended)

1. Open your terminal/command prompt
2. Navigate to the project root directory
3. Run the initialization script:
   ```
   node init-project.js
   ```
4. Start both the backend and frontend servers:
   ```
   node start-dev.js
   ```

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Edit `config/config.env` with your MongoDB connection string and other settings

4. Start the backend server:
   ```
   npm run dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

## Accessing the Application

Once both servers are running:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Testing the API

You can test the backend API using the provided test script:

```
cd backend
npm run test-api
```

## Docker Deployment (Alternative)

If you prefer to run the application in containers:

1. Ensure Docker and Docker Compose are installed
2. Run the application:
   ```
   docker-compose up
   ```

## API Documentation

The project includes a Postman collection for API testing:
- File: `TaskManager-API.postman_collection.json`
- Import this file into Postman to test all API endpoints

## Project Structure

```
├── backend/          # Node.js + Express backend API
├── frontend/         # React.js frontend application
├── docker-compose.yml # Docker orchestration
├── README.md         # Detailed project documentation
├── SCALABILITY.md    # Scalability considerations
└── ...               # Other configuration files
```

## Key Features Implemented

### Backend
- User authentication with JWT
- Role-based access control
- Task management (CRUD operations)
- Input validation and error handling
- Security features (helmet, CORS, etc.)

### Frontend
- User registration and login
- Protected dashboard
- Task management UI
- Responsive design

## Need Help?

If you encounter any issues:

1. Check that all prerequisites are installed
2. Verify your MongoDB connection settings
3. Review the detailed documentation in README.md
4. Check the development.log for implementation details

For further assistance, please refer to the comprehensive documentation in the README.md file.
# Task Manager - Full Stack Application

This is a complete full-stack Task Manager application built with a REST API backend and React.js frontend. The application features user authentication, role-based access control, and task management capabilities.

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication & Security](#authentication--security)
- [Role-Based Access Control](#role-based-access-control)
- [Frontend Features](#frontend-features)
- [Responsive Design](#responsive-design)
- [Admin Task Assignment](#admin-task-assignment)
- [Real-time Notifications](#real-time-notifications)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Scalability Considerations](#scalability-considerations)
- [API Documentation](#api-documentation)

## Project Overview

The Task Manager application allows users to register, login, and manage their tasks. Administrators can assign tasks to specific users and monitor overall task completion. The application implements JWT authentication with role-based access control (user vs admin) and provides full CRUD functionality for tasks.

## Key Features

### Backend Features
- User registration & login with password hashing (bcrypt)
- JWT token-based authentication with secure storage
- Role-based access control (User vs Admin)
- RESTful API design with proper HTTP status codes
- CRUD operations for tasks
- Admin task assignment to users
- Input validation and sanitization
- Error handling middleware
- Security features (Helmet, CORS, rate limiting)
- MongoDB integration with Mongoose ODM
- API versioning (/api/v1/)

### Frontend Features
- Responsive design for mobile and desktop
- User authentication interface (login/register)
- Dashboard with task management
- Real-time notification system
- Role-specific UI elements
- Task filtering and sorting
- Form validation
- Loading states and error handling

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **Bcrypt.js** - Password hashing
- **Joi** - Input validation
- **Helmet** - Security headers
- **Cors** - Cross-origin resource sharing
- **Morgan** - HTTP request logging

### Frontend
- **React.js** - JavaScript library for UI
- **Vite** - Build tool and development server
- **Axios** - HTTP client
- **CSS3** - Styling and responsive design

## Project Structure

```
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── config.env         # Environment variables
│   ├── controllers/
│   │   ├── auth.js            # Authentication logic
│   │   └── tasks.js           # Task management logic
│   ├── middleware/
│   │   ├── auth.js            # Authentication middleware
│   │   └── error.js           # Error handling middleware
│   ├── models/
│   │   ├── User.js            # User schema and methods
│   │   └── Task.js            # Task schema and methods
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── tasks.js           # Task routes
│   ├── utils/
│   │   └── errorResponse.js   # Custom error class
│   ├── server.js              # Main server file
│   └── package.json           # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthPage.jsx    # Authentication page
│   │   │   ├── Dashboard.jsx   # Main dashboard
│   │   │   ├── TaskList.jsx    # Task listing component
│   │   │   ├── TaskItem.jsx    # Individual task component
│   │   │   └── TaskForm.jsx    # Task creation form
│   │   ├── App.jsx             # Main App component
│   │   ├── App.css             # Application styles
│   │   └── main.jsx            # Entry point
│   ├── index.html              # Main HTML file
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
├── docker-compose.yml          # Docker orchestration
├── init-project.js             # Dependency installation script
└── start-dev.js                # Development server startup script
```

## Quick Start

1. Ensure MongoDB is running on port 27017
2. Run the initialization script:
   ```bash
   node init-project.js
   ```
3. Start both servers:
   ```bash
   node start-dev.js
   ```
4. Visit http://localhost:3000 in your browser

## Detailed Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `config/config.env`:
   ```
   NODE_ENV=development
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=30d
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open your browser to http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user info

### Tasks
- `GET /api/v1/tasks` - Get all tasks for current user
- `POST /api/v1/tasks` - Create a new task
- `GET /api/v1/tasks/:id` - Get a specific task
- `PUT /api/v1/tasks/:id` - Update a task
- `DELETE /api/v1/tasks/:id` - Delete a task

## Database Schema

### User Schema
```javascript
{
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### Task Schema
```javascript
{
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isNotified: {
    type: Boolean,
    default: false
  },
  assignedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## Authentication & Security

### Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Passwords are never stored in plain text
- Passwords are not returned in API responses

### JWT Authentication
- Tokens are generated upon successful login
- Tokens expire after 30 days
- Tokens are required for accessing protected routes
- Tokens should be stored securely in HTTP-only cookies or local storage

### Security Features
- Helmet for HTTP security headers
- CORS configuration for cross-origin requests
- Input validation and sanitization
- Rate limiting (can be implemented)
- Protected routes middleware

## Role-Based Access Control

### User Role
- Can create, read, update, and delete their own tasks
- Can view tasks assigned to them by admins
- Cannot assign tasks to other users
- Cannot access other users' data

### Admin Role
- Has all user permissions
- Can assign tasks to any user
- Can view all tasks in the system
- Can update any task
- Can delete any task

## Frontend Features

### Authentication Interface
- Clean login and registration forms
- Form validation and error handling
- Loading states during API requests
- Success and error messages

### Dashboard
- Professional navigation bar with user profile
- Notification bell icon for assigned tasks
- Task creation form
- Task listing with filtering options
- Responsive design for all screen sizes

### Task Management
- Create new tasks with title and description
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Filter tasks by status (all, pending, completed)

### Admin Features
- Assign tasks to specific users
- View all tasks in the system
- Manage user tasks

## Responsive Design

The frontend is fully responsive and works on:
- Mobile phones (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)
- Large screens (1200px and up)

Key responsive features:
- Flexible grid layouts
- Media queries for different screen sizes
- Touch-friendly controls
- Adaptive typography
- Collapsible navigation elements

## Admin Task Assignment

Administrators can assign tasks to specific users:
1. Admins see an "Assign To" dropdown when creating tasks
2. Tasks assigned by admins appear in the assigned user's dashboard
3. Assigned tasks are marked with notification status
4. Users receive visual indicators for newly assigned tasks

## Real-time Notifications

The application features a notification system:
- Bell icon in the navigation bar
- Visual badge showing notification count
- Clicking the bell refreshes the task list
- Assigned tasks are marked as notified when first viewed

## Development

### Scripts
- `node init-project.js` - Install all dependencies
- `node start-dev.js` - Start both frontend and backend servers
- `npm run dev` (backend) - Start backend development server
- `npm run dev` (frontend) - Start frontend development server

### Code Structure
- Modular architecture with clear separation of concerns
- Consistent naming conventions
- Error handling throughout
- Input validation on both frontend and backend

## Testing

### Backend Testing
- API endpoint testing with Postman
- Validation testing
- Error case handling
- Authentication flow testing

### Frontend Testing
- Component rendering tests
- User interaction testing
- Form validation testing
- Responsive design testing

## Deployment

### Production Deployment
1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB instance
3. Use a stronger JWT secret
4. Implement logging (e.g., Winston)
5. Add API rate limiting
6. Use a process manager like PM2
7. Configure HTTPS

### Docker Deployment
The application includes Docker configuration:
- `docker-compose.yml` for multi-container deployment
- Dockerfiles for both frontend and backend
- Ready for containerized deployment

## Scalability Considerations

### Current Architecture
- Modular, layered architecture
- API versioning for backward compatibility
- Environment-based configuration
- Proper error handling and logging

### Future Improvements
- Microservices architecture for large scale
- Caching layer with Redis
- Load balancing for high availability
- Database sharding for large datasets
- Asynchronous processing with message queues
- Container orchestration with Kubernetes
- Monitoring and logging with centralized systems

## API Documentation

The API is documented with a Postman collection:
- File: `TaskManager-API.postman_collection.json`
- Includes examples for all endpoints
- Environment variables for easy testing
- Request/response examples

To use the Postman collection:
1. Import the JSON file into Postman
2. Set environment variables (base_url, token)
3. Test endpoints with sample data
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { API_BASE_URL } from '../utils/api';

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/tasks`, config);
      setTasks(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/tasks`, taskData, config);
      setTasks([...tasks, res.data.data]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/v1/tasks/${id}`, taskData, config);
      setTasks(tasks.map(task => task._id === id ? res.data.data : task));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/v1/tasks/${id}`, config);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  // Safely get the first letter of the user's name
  const getUserInitial = () => {
    if (user && user.name && typeof user.name === 'string') {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U'; // Default to 'U' for User if name is not available
  };

  // Safely get the user's name
  const getUserName = () => {
    if (user && user.name && typeof user.name === 'string') {
      return user.name;
    }
    return 'User'; // Default name if not available
  };

  // Safely get the user's role
  const getUserRole = () => {
    if (user && user.role) {
      return user.role === 'admin' ? 'Administrator' : 'User';
    }
    return 'User'; // Default role if not available
  };

  // Get role-specific class
  const getRoleClass = () => {
    return user && user.role === 'admin' ? 'admin' : 'user';
  };

  // Handle notification bell click (refresh tasks)
  const handleNotificationClick = () => {
    fetchTasks();
  };

  return (
    <div>
      {/* New Professional Navbar with Profile Icon and Name */}
      <nav className="top-navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <a className="navbar-brand-new" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Task Manager</span>
            </a>
          </div>
          
          <div className="navbar-right">
            {/* Notification Bell Icon */}
            <div className="notification-bell" onClick={handleNotificationClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            
            <div className="user-profile">
              <div className="user-avatar">
                {getUserInitial()}
              </div>
              <div className="user-info-new">
                <div className="user-name-new">{getUserName()}</div>
                <div className={`user-role-new ${getRoleClass()}`}>{getUserRole()}</div>
              </div>
            </div>
            <button 
              className="logout-btn"
              onClick={onLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p className="text-muted">Welcome back, {getUserName()}!</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading tasks...</p>
            </div>
          </div>
        ) : (
          <>
            <TaskForm onAddTask={addTask} user={user} />
            <TaskList 
              tasks={tasks} 
              onUpdateTask={updateTask} 
              onDeleteTask={deleteTask} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
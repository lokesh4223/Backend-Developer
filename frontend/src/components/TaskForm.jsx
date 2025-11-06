import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

const TaskForm = ({ onAddTask, user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '' // New field for task assignment
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // For admin to select users

  const { title, description, assignedTo } = formData;

  // Fetch users if admin
  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };
      
      // For demo purposes, we'll use a mock API endpoint
      // In a real app, you would have an endpoint to fetch users
      // For now, we'll simulate with mock data
      const mockUsers = [
        { _id: '1', name: 'John Doe', email: 'john@example.com' },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        { _id: '3', name: 'Bob Johnson', email: 'bob@example.com' }
      ];
      setUsers(mockUsers);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      setLoading(true);
      try {
        // Prepare task data
        const taskData = { title, description };
        
        // Include assignedTo if admin and selected
        if (user.role === 'admin' && assignedTo) {
          taskData.assignedTo = assignedTo;
        }
        
        await onAddTask(taskData);
        setFormData({ title: '', description: '', assignedTo: '' });
      } catch (error) {
        console.error('Error adding task:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="task-form card">
      <div className="card-body">
        <h3 className="card-title mb-4">Create New Task</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="title" className="form-label">Task Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={title}
              onChange={onChange}
              required
              placeholder="What needs to be done?"
            />
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={description}
              onChange={onChange}
              required
              placeholder="Add details about your task..."
              rows="3"
            />
          </div>
          
          {/* Admin-only assignment field */}
          {user && user.role === 'admin' && (
            <div className="form-group mb-4">
              <label htmlFor="assignedTo" className="form-label">Assign To</label>
              <select
                id="assignedTo"
                name="assignedTo"
                className="form-select"
                value={assignedTo}
                onChange={onChange}
              >
                <option value="">Select a user (optional)</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
              <div className="form-text">Leave blank to create task for yourself</div>
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading || !title || !description}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="ms-1">Creating...</span>
              </>
            ) : (
              'Add Task'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
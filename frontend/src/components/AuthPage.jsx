import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, password, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = isLogin
        ? { email, password }
        : { name, email, password, role };

      const res = await axios.post(
        `${API_BASE_URL}/api/v1/auth/${isLogin ? 'login' : 'register'}`,
        body,
        config
      );

      if (res.data.success) {
        onLogin(res.data);
        setSuccess(isLogin ? 'Login successful!' : 'Registration successful!');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="auth-card card">
          <div className="card-body">
            <div className="auth-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-muted">
                {isLogin 
                  ? 'Sign in to your account to continue' 
                  : 'Create an account to get started'}
              </p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={onSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={onChange}
                    required={!isLogin}
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={onChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={onChange}
                  required
                  placeholder="Enter your password"
                  minLength="6"
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="role" className="form-label">Role</label>
                  <select 
                    id="role" 
                    name="role" 
                    className="form-select"
                    value={role} 
                    onChange={onChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="ms-1">Processing...</span>
                    </>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </div>
            </form>

            <div className="auth-toggle">
              <p className="text-muted">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  className="btn btn-link p-0 ms-1"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
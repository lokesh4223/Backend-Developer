const axios = require('axios');

// Test the backend API
async function testAPI() {
  const baseURL = 'http://localhost:5000/api/v1';
  
  try {
    console.log('Testing API endpoints...\n');
    
    // Test registration
    console.log('1. Testing user registration...');
    const registerResponse = await axios.post(`${baseURL}/auth/register`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });
    
    console.log('Registration response:', registerResponse.data);
    
    // Test login
    console.log('\n2. Testing user login...');
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Login response:', loginResponse.data);
    
    const token = loginResponse.data.token;
    
    // Test get current user
    console.log('\n3. Testing get current user...');
    const userResponse = await axios.get(`${baseURL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('User info:', userResponse.data);
    
    console.log('\nAPI tests completed successfully!');
  } catch (error) {
    console.error('API test failed:', error.response ? error.response.data : error.message);
  }
}

testAPI();
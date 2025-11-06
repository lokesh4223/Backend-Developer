const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Backend and Frontend development servers...');

// Start backend server
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend server
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

// Handle process exit
process.on('exit', () => {
  backend.kill();
  frontend.kill();
});

console.log('Backend server starting on http://localhost:5000');
console.log('Frontend server starting on http://localhost:3000');
console.log('Press Ctrl+C to stop both servers');
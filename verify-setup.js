const fs = require('fs');
const path = require('path');

console.log('Verifying project setup...\n');

// Check if required directories exist
const requiredDirs = ['backend', 'frontend', 'backend/controllers', 'backend/models', 'backend/routes', 'frontend/src'];
const missingDirs = [];

requiredDirs.forEach(dir => {
  if (!fs.existsSync(path.join(__dirname, dir))) {
    missingDirs.push(dir);
  }
});

if (missingDirs.length > 0) {
  console.log('❌ Missing directories:');
  missingDirs.forEach(dir => console.log(`  - ${dir}`));
} else {
  console.log('✅ All required directories present');
}

// Check if required files exist
const requiredFiles = [
  'backend/server.js',
  'backend/package.json',
  'backend/models/User.js',
  'backend/models/Task.js',
  'backend/controllers/auth.js',
  'backend/controllers/tasks.js',
  'backend/routes/auth.js',
  'backend/routes/tasks.js',
  'frontend/package.json',
  'frontend/src/App.jsx',
  'frontend/src/main.jsx',
  'README.md',
  'SCALABILITY.md',
  'TaskManager-API.postman_collection.json'
];

const missingFiles = [];

requiredFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log('❌ Missing files:');
  missingFiles.forEach(file => console.log(`  - ${file}`));
} else {
  console.log('✅ All required files present');
}

// Check if config files exist
const configFiles = [
  'backend/config/config.env',
  'backend/config/db.js'
];

const missingConfig = [];

configFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    missingConfig.push(file);
  }
});

if (missingConfig.length > 0) {
  console.log('⚠️  Missing config files:');
  missingConfig.forEach(file => console.log(`  - ${file}`));
  console.log('  Please create these files based on the documentation');
} else {
  console.log('✅ All config files present');
}

// Check if Docker files exist
const dockerFiles = [
  'docker-compose.yml',
  'backend/Dockerfile',
  'frontend/Dockerfile'
];

const missingDocker = [];

dockerFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    missingDocker.push(file);
  }
});

if (missingDocker.length > 0) {
  console.log('⚠️  Missing Docker files:');
  missingDocker.forEach(file => console.log(`  - ${file}`));
} else {
  console.log('✅ All Docker files present');
}

console.log('\nVerification complete!');
console.log('\nNext steps:');
console.log('1. Run `node init-project.js` to install dependencies');
console.log('2. Configure your environment variables in backend/config/config.env');
console.log('3. Run `node start-dev.js` to start both servers');
console.log('4. Visit http://localhost:3000 in your browser');
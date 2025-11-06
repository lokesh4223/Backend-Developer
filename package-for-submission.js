const fs = require('fs');
const path = require('path');

console.log('Preparing project for submission...\n');

// List of files to include in submission
const importantFiles = [
  'README.md',
  'GETTING_STARTED.md',
  'PROJECT_SUMMARY.md',
  'DELIVERABLES.md',
  'SCALABILITY.md',
  'development.log',
  'TaskManager-API.postman_collection.json',
  'docker-compose.yml',
  'init-project.js',
  'start-dev.js',
  'verify-setup.js'
];

const backendFiles = [
  'backend/package.json',
  'backend/server.js',
  'backend/Dockerfile',
  'backend/config/config.env',
  'backend/config/db.js',
  'backend/models/User.js',
  'backend/models/Task.js',
  'backend/controllers/auth.js',
  'backend/controllers/tasks.js',
  'backend/routes/auth.js',
  'backend/routes/tasks.js',
  'backend/middleware/auth.js',
  'backend/middleware/error.js',
  'backend/utils/errorResponse.js'
];

const frontendFiles = [
  'frontend/package.json',
  'frontend/index.html',
  'frontend/vite.config.js',
  'frontend/Dockerfile',
  'frontend/nginx.conf',
  'frontend/src/App.jsx',
  'frontend/src/App.css',
  'frontend/src/main.jsx',
  'frontend/src/index.css',
  'frontend/src/components/AuthPage.jsx',
  'frontend/src/components/Dashboard.jsx',
  'frontend/src/components/TaskList.jsx',
  'frontend/src/components/TaskItem.jsx',
  'frontend/src/components/TaskForm.jsx'
];

// Check if all important files exist
const allFiles = [...importantFiles, ...backendFiles, ...frontendFiles];
let missingFiles = 0;

console.log('Checking required files...\n');

allFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    console.log(`❌ Missing: ${file}`);
    missingFiles++;
  }
});

if (missingFiles > 0) {
  console.log(`\n⚠️  ${missingFiles} files are missing. Please verify the project structure.`);
  process.exit(1);
} else {
  console.log('✅ All required files are present.');
}

console.log('\nProject is ready for submission!');
console.log('\nDeliverables included:');
console.log('- Working backend REST API with authentication and CRUD operations');
console.log('- Functional frontend UI with React.js');
console.log('- API documentation (Postman collection)');
console.log('- Database schema design');
console.log('- Scalability considerations document');
console.log('- Deployment-ready Docker configuration');
console.log('- Comprehensive documentation');
console.log('- Development process log');

console.log('\nTo submit:');
console.log('1. Create a zip file of the entire project directory');
console.log('2. Include this package in your email to saami@bajarangs.com, nagasai@bajarangs.com, and chetan@bajarangs.com');
console.log('3. CC sonika@primetrade.ai');
console.log('4. Use subject: "Frontend Developer Task"');

console.log('\n✅ Project packaging verification complete!');
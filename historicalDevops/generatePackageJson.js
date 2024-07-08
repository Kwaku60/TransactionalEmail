const fs = require('fs');

// Read package-lock.json
const packageLock = require('./package-lock.json');

// Extract dependencies
const dependencies = {};
if (packageLock.dependencies) {
  for (const [name, data] of Object.entries(packageLock.dependencies)) {
    dependencies[name] = data.version;
  }
}

// Create package.json content
const packageJsonContent = {
  name: "your-project-name",
  version: "1.0.0",
  description: "Your project description",
  main: "index.js",
  scripts: {
    start: "node index.js"
  },
  author: "Your Name",
  license: "ISC",
  dependencies: dependencies
};

// Write to package.json
fs.writeFileSync('package.json', JSON.stringify(packageJsonContent, null, 2), 'utf8');

console.log('package.json has been created successfully.');

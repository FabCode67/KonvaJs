const fs = require('fs');
const path = require('path');

// Function to fix the paths in HTML files
function fixPaths(directory) {
  const indexHtmlPath = path.join(directory, 'index.html');
  
  if (fs.existsSync(indexHtmlPath)) {
    let content = fs.readFileSync(indexHtmlPath, 'utf8');
    
    // Replace absolute paths with relative paths
    content = content.replace(/file:\/\/\/C:\/_next\//g, './_next/');
    content = content.replace(/\/_next\//g, './_next/');
    
    fs.writeFileSync(indexHtmlPath, content);
    console.log(`Fixed paths in ${indexHtmlPath}`);
  } else {
    console.log(`File not found: ${indexHtmlPath}`);
  }

  // Also fix 404.html if it exists
  const notFoundPath = path.join(directory, '404.html');
  if (fs.existsSync(notFoundPath)) {
    let content = fs.readFileSync(notFoundPath, 'utf8');
    
    // Replace absolute paths with relative paths
    content = content.replace(/file:\/\/\/C:\/_next\//g, './_next/');
    content = content.replace(/\/_next\//g, './_next/');
    
    fs.writeFileSync(notFoundPath, content);
    console.log(`Fixed paths in ${notFoundPath}`);
  }
}

// Fix paths in the out directory
fixPaths(path.join(__dirname, 'out'));
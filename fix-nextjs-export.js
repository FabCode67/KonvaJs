const fs = require('fs');
const path = require('path');

// Function to update Next.js config file
function updateNextConfig() {
  const configPath = path.join(__dirname, 'next.config.js');
  
  if (fs.existsSync(configPath)) {
    let content = fs.readFileSync(configPath, 'utf8');
    
    // Ensure basePath is set to empty string and assetPrefix to ./ for proper static asset loading
    if (!content.includes('basePath:')) {
      content = content.replace('const nextConfig = {', 'const nextConfig = {\n  basePath: \'\',\n  assetPrefix: \'./\',');
    }
    
    fs.writeFileSync(configPath, content);
    console.log('Updated next.config.js with proper basePath and assetPrefix');
  } else {
    console.log('next.config.js not found');
  }
}

// Update Next.js config
updateNextConfig();
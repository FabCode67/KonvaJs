const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up Electron + Next.js + Fabric.js project...');

// Step 1: Initialize a new Next.js project
console.log('\n1. Creating a new Next.js app...');
try {
  // Create a basic package.json first
  const packageJson = {
    "name": "electron-canvas-draw",
    "version": "1.0.0",
    "description": "A simple drawing application using Electron.js, Next.js, and Fabric.js",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "export": "next export",
      "electron-dev": "electron main.js",
      "electron-pack": "next build && next export && electron-builder --dir",
      "electron-dist": "next build && next export && electron-builder"
    },
    "dependencies": {
      "next": "^14.0.4",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "fabric": "^5.3.0",
      "electron-is-dev": "^2.0.0"
    },
    "devDependencies": {
      "electron": "^26.0.0",
      "electron-builder": "^24.6.3"
    },
    "build": {
      "appId": "com.electron.canvas-draw",
      "productName": "Canvas Draw",
      "files": [
        "main.js",
        "preload.js",
        "out/**/*"
      ],
      "directories": {
        "output": "dist"
      },
      "win": {
        "target": "portable"
      }
    }
  };
  
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log('Created package.json');
  
  // Install npm packages one by one to avoid conflicts
  console.log('\nInstalling packages individually to avoid conflicts...');
  
  console.log('Installing Next.js, React, and React-DOM...');
  execSync('npm install next@14.0.4 react@18.2.0 react-dom@18.2.0 --no-save', { stdio: 'inherit' });
  
  console.log('Installing Fabric.js...');
  execSync('npm install fabric@5.3.0 --no-save', { stdio: 'inherit' });
  
  console.log('Installing Electron and related packages...');
  execSync('npm install electron@26.0.0 electron-builder@24.6.3 electron-is-dev@2.0.0 --no-save', { stdio: 'inherit' });
  
  // Write the final package.json
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  
  console.log('All packages installed.');
  
} catch (error) {
  console.error('Error during package installation:', error.message);
  process.exit(1);
}

// Step 2: Create the necessary files for Electron
console.log('\n2. Creating Electron files...');
const mainJs = `const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : \`file://\${path.join(__dirname, './out/index.html')}\`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});`;

const preloadJs = `// Preload script to expose Node.js API to the renderer process safely
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(\`\${dependency}-version\`, process.versions[dependency]);
  }
});`;

const nextConfigJs = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig;`;

// Create files
fs.writeFileSync('main.js', mainJs);
fs.writeFileSync('preload.js', preloadJs);
fs.writeFileSync('next.config.js', nextConfigJs);

// Step 3: Create Next.js pages and components
console.log('\n3. Creating Next.js pages and components...');

// Create directories if they don't exist
if (!fs.existsSync('pages')) fs.mkdirSync('pages');
if (!fs.existsSync('components')) fs.mkdirSync('components');
if (!fs.existsSync('public')) fs.mkdirSync('public');

// Create index.js
const indexJs = `import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the DrawingCanvas component with no SSR
const DrawingCanvas = dynamic(
  () => import('../components/DrawingCanvas'),
  { ssr: false }
);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  // Only render the canvas component on the client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Canvas Drawing App</h1>
        <p>Draw freely on the canvas below</p>
      </header>

      <main>
        {isMounted && <DrawingCanvas />}
      </main>

      <footer>
        <p>Made with Electron, Next.js, and Fabric.js</p>
      </footer>

      <style jsx>{\`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        header {
          width: 100%;
          max-width: 800px;
          padding: 1.5rem 0;
          text-align: center;
        }

        h1 {
          margin: 0;
          line-height: 1.15;
          font-size: 2.5rem;
          color: #333;
        }

        p {
          margin: 0.5rem 0;
          font-size: 1.25rem;
          color: #666;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
        }
      \`}</style>

      <style jsx global>{\`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      \`}</style>
    </div>
  );
}`;

// Create _app.js
const appJs = `function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp`;

// Create _document.js
const documentJs = `import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Canvas Drawing App</title>
        <meta name="description" content="A simple drawing application" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}`;

// Create DrawingCanvas.js
const drawingCanvasJs = `import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [isDrawingMode, setIsDrawingMode] = useState(true);

  // Initialize canvas on component mount
  useEffect(() => {
    // Create a new fabric canvas once the component is mounted
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      isDrawingMode: true,
    });

    // Create grid lines
    createGrid();

    // Setup drawing brush
    setupBrush();

    // Cleanup on component unmount
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
    };
  }, []);

  // Update brush when settings change
  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.isDrawingMode = isDrawingMode;
      setupBrush();
    }
  }, [brushSize, brushColor, isDrawingMode]);

  // Create grid lines
  const createGrid = () => {
    const gridSize = 20;
    const canvasWidth = fabricCanvasRef.current.width;
    const canvasHeight = fabricCanvasRef.current.height;

    // Create vertical lines
    for (let i = 0; i <= canvasWidth; i += gridSize) {
      const line = new fabric.Line([i, 0, i, canvasHeight], {
        stroke: '#eeeeee',
        selectable: false,
        evented: false,
      });
      fabricCanvasRef.current.add(line);
    }

    // Create horizontal lines
    for (let i = 0; i <= canvasHeight; i += gridSize) {
      const line = new fabric.Line([0, i, canvasWidth, i], {
        stroke: '#eeeeee',
        selectable: false,
        evented: false,
      });
      fabricCanvasRef.current.add(line);
    }

    fabricCanvasRef.current.renderAll();
  };

  // Setup the brush
  const setupBrush = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    canvas.freeDrawingBrush.width = brushSize;
    canvas.freeDrawingBrush.color = brushColor;
  };

  // Clear the canvas
  const clearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      createGrid();
    }
  };

  // Toggle drawing mode
  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
  };

  // Save canvas as image
  const saveCanvas = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1,
      });
      
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas-drawing.png';
      link.click();
    }
  };

  return (
    <div className="drawing-canvas-container">
      <div className="canvas-controls">
        <div className="control-group">
          <label htmlFor="brush-size">Brush Size:</label>
          <input
            id="brush-size"
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
          />
          <span>{brushSize}px</span>
        </div>
        
        <div className="control-group">
          <label htmlFor="brush-color">Color:</label>
          <input
            id="brush-color"
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
        </div>
        
        <button onClick={toggleDrawingMode}>
          {isDrawingMode ? 'Selection Mode' : 'Drawing Mode'}
        </button>
        
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={saveCanvas}>Save</button>
      </div>
      
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
      </div>
      
      <style jsx>{\`
        .drawing-canvas-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        
        .canvas-controls {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          align-items: center;
        }
        
        .control-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        button {
          padding: 8px 16px;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        
        button:hover {
          background-color: #3a80d2;
        }
        
        .canvas-wrapper {
          border: 1px solid #cccccc;
          margin-top: 10px;
        }
      \`}</style>
    </div>
  );
};

export default DrawingCanvas;`;

// Write Next.js files
fs.writeFileSync(path.join('pages', 'index.js'), indexJs);
fs.writeFileSync(path.join('pages', '_app.js'), appJs);
fs.writeFileSync(path.join('pages', '_document.js'), documentJs);
fs.writeFileSync(path.join('components', 'DrawingCanvas.js'), drawingCanvasJs);

// Create a .gitignore file
const gitignore = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build
/dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts`;

fs.writeFileSync('.gitignore', gitignore);

console.log('\nProject setup complete!');
console.log('\nTo run the application:');
console.log('1. Start the Next.js dev server: npm run dev');
console.log('2. In a new terminal, start Electron: npm run electron-dev');
console.log('\nTo build an executable:');
console.log('1. Run: npm run electron-dist');
console.log('2. Find the executable in the "dist" folder');

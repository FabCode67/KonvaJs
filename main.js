const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const http = require('http');
const fs = require('fs');

let mainWindow;

// Function to check if the Next.js server is running
function checkNextServer(url, callback) {
  http.get(url, (res) => {
    if (res.statusCode === 200) {
      callback(true);
    } else {
      callback(false);
    }
  }).on('error', () => {
    callback(false);
  });
}

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

  const outPath = path.join(__dirname, 'out', 'index.html');
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${outPath}`;

  if (isDev) {
    // Check if Next.js server is running
    checkNextServer('http://localhost:3000', (isRunning) => {
      if (isRunning) {
        mainWindow.loadURL(startUrl);
      } else {
        dialog.showErrorBox(
          'Next.js Server Not Running', 
          'The Next.js development server is not running.\n\nPlease start it first with "npm run dev" in a separate terminal, then restart this application.'
        );
      }
    });
    
    mainWindow.webContents.openDevTools();
  } else {
    // Check if the out directory exists
    if (fs.existsSync(outPath)) {
      mainWindow.loadFile(outPath);
    } else {
      dialog.showErrorBox(
        'Build Files Missing', 
        `Could not find the Next.js build files at ${outPath}.\n\nPlease run "npm run build" first.`
      );
    }
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
});
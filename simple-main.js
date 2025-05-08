const { app, BrowserWindow } = require('electron');
const path = require('path');

// Force production mode
process.env.NODE_ENV = 'production';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const indexPath = path.join(__dirname, 'out', 'index.html');
  console.log('Loading file from:', indexPath);
  
  try {
    mainWindow.loadFile(indexPath);
    console.log('File loaded successfully');
  } catch (error) {
    console.error('Error loading file:', error);
  }

  // Show developer tools to help debugging
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
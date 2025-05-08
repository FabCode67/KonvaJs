# Electron Canvas Drawing App Installation Guide

## Issues and Solutions

Based on the error logs you provided, there are a few issues with the npm installation:

1. Certificate errors with the Taobao mirror
2. Problems with installing windows-build-tools

## How to Install and Run the App

### Option 1: Simplified Installation (Recommended)

1. Run the `setup.bat` file I've created for you:
   - Double-click on `setup.bat` in the project folder
   - This will install packages individually and avoid some common errors

2. After successful installation:
   - Start the Next.js development server:
     ```
     npm run dev
     ```
   - In a new terminal window, start Electron:
     ```
     npm run electron-dev
     ```

### Option 2: Node.js Script Setup

If Option 1 doesn't work, try this approach:

1. Run the Node.js setup script:
   ```
   node setup-project.js
   ```

2. This script will create and set up all necessary files and install packages one by one to avoid dependency conflicts.

### Option 3: Manual Installation

If the above options don't work, try installing packages one by one:

1. Delete the `node_modules` folder and `package-lock.json` if they exist
2. Update your `.npmrc` file to use official mirrors
3. Install packages individually:
   ```
   npm install next@14.0.4 react@18.2.0 react-dom@18.2.0
   npm install fabric@5.3.0
   npm install --save-dev electron@26.0.0 electron-builder@24.6.3
   npm install electron-is-dev@2.0.0
   ```

## Building an Executable

After successful installation and confirming that the app works in development mode:

1. Build the Next.js app and create an executable:
   ```
   npm run electron-dist
   ```

2. Find the executable file in the `dist` folder. I've configured the build to create a portable executable, which doesn't require installation.

## Troubleshooting

If you're still experiencing issues:

1. Try using a global Node.js package manager like Yarn:
   ```
   npm install -g yarn
   yarn
   ```

2. Update Node.js to the latest LTS version if you haven't already

3. For Windows-specific build issues, an alternative to windows-build-tools is to install Visual Studio Build Tools manually from the Microsoft website

## Project Features

- Drawing on canvas with Fabric.js
- Grid lines for better visualization
- Adjustable brush size and color
- Toggle between drawing and selection modes
- Save drawings as PNG images
- Electron-based desktop application

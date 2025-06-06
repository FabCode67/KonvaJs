# Canvas Drawing App

A simple drawing application built with Electron.js, Next.js, and Fabric.js.

## Features

- Drawing on canvas with adjustable brush size and color
- Grid lines for better visualization
- Save drawing as PNG
- Toggle between drawing and selection modes
- Clear canvas functionality

## Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Development mode:

   a. Start Next.js development server:
   ```bash
   npm run dev
   ```

   b. In a separate terminal, start Electron:
   ```bash
   npm run electron-dev
   ```

3. Build for production:
   ```bash
   npm run build
   npm run electron-dist
   ```

## Building Executable

To build an executable file:

1. Make sure you've run the build command:
   ```bash
   npm run build
   ```

2. Run the packaging command:
   ```bash
   npm run electron-dist
   ```

3. Find the executable in the `dist` folder.

## Technologies Used

- Electron.js - Desktop application framework
- Next.js - React framework
- Fabric.js - Canvas library for drawing functionality
#   K o n v a J s  
 
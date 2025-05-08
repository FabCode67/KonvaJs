@echo off
echo Setting up the Electron Canvas Drawing App...
echo.

echo Cleaning previous installation...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

echo.
echo Updating .npmrc to use official mirrors...
echo electron_mirror=https://github.com/electron/electron/releases/download/ > .npmrc

echo.
echo Installing packages individually...

echo.
echo Installing Next.js and React...
call npm install next@14.0.4 react@18.2.0 react-dom@18.2.0

echo.
echo Installing Konva.js...
call npm install konva@9.2.0 react-konva@18.2.10

echo.
echo Installing Electron and related packages...
call npm install --save-dev electron@26.0.0 electron-builder@24.6.3
call npm install electron-is-dev@2.0.0

echo.
echo Setup complete!
echo.
echo To run the application:
echo 1. Start the Next.js dev server: npm run dev
echo 2. In a new terminal, start Electron: npm run electron-dev
echo.
echo To build an executable:
echo 1. Run: npm run electron-dist
echo 2. Find the executable in the "dist" folder

pause

@echo off
echo Fixing Canvas Drawing App Build Issues...
echo.

echo Installing Konva instead of Fabric.js to avoid native dependencies...
call npm uninstall fabric
call npm install konva react-konva

echo.
echo Recreating the Drawing Canvas component...
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

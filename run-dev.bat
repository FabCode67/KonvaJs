@echo off
echo Starting Electron Canvas Drawing App in development mode...
echo.
echo Starting Next.js development server...
start cmd /k "npm run dev"
echo.
echo Waiting for Next.js server to start...
timeout /t 5
echo.
echo Starting Electron...
start cmd /k "npm run electron-dev"
echo.
echo Both Next.js and Electron have been started.
echo.
echo To stop the application, close both command windows.

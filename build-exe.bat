@echo off
echo Building Electron executable...
echo.

echo Building Next.js static files...
call npm run build

echo.
echo Creating executable with electron-builder...
echo NOTE: If you encounter 404 errors, run update-electron.bat first
call npm run electron-dist

echo.
echo Build completed!
echo The executable can be found in the 'dist' folder.
echo.
pause

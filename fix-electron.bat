@echo off
echo Fixing Electron installation issues...
echo.

echo Removing .npmrc file to use default mirrors...
del .npmrc

echo.
echo Installing Electron version 21.4.4 (known stable version)...
call npm install --save-dev electron@21.4.4

echo.
echo Installing Electron Builder...
call npm install --save-dev electron-builder@23.6.0

echo.
echo Update completed! Now trying to build...
echo.
call npm run build
call npm run electron-dist

echo.
echo If the build was successful, the executable can be found in the 'dist' folder.
echo.
pause

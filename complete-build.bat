@echo off
echo Building Electron app with proper path configuration...
echo.

echo 1. Updating Next.js configuration...
node fix-nextjs-export.js

echo.
echo 2. Building Next.js static files...
call npm run build

echo.
echo 3. Fixing paths in HTML files...
node fix-paths.js

echo.
echo 4. Creating portable app folder...
if not exist "dist" mkdir dist
if not exist "dist\electron-app" mkdir dist\electron-app

echo.
echo 5. Copying files to portable app folder...
xcopy /E /I /Y out dist\electron-app\out
copy main.js dist\electron-app\
copy preload.js dist\electron-app\
copy package-standalone.json dist\electron-app\package.json

echo.
echo 6. Creating launcher script...
echo @echo off > dist\electron-app\start.bat
echo echo Starting Canvas Drawing App... >> dist\electron-app\start.bat
echo npx electron . >> dist\electron-app\start.bat

echo.
echo 7. Build completed successfully!
echo The portable app is in the 'dist\electron-app' folder.
echo To run it, navigate to that folder and run 'start.bat'
echo.
pause

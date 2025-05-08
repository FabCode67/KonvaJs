@echo off
echo Building standalone Electron Canvas Drawing App...
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
echo 4. Creating standalone app folder...
if not exist "dist" mkdir dist
if not exist "dist\electron-canvas-draw" mkdir dist\electron-canvas-draw
if not exist "dist\electron-canvas-draw\out" mkdir dist\electron-canvas-draw\out

echo.
echo 5. Copying files to standalone app folder...
xcopy /E /I /Y out dist\electron-canvas-draw\out
copy standalone-main.js dist\electron-canvas-draw\main.js
copy preload.js dist\electron-canvas-draw\preload.js
copy package-standalone.json dist\electron-canvas-draw\package.json

echo.
echo 6. Creating start.bat launcher...
echo @echo off > dist\electron-canvas-draw\start.bat
echo echo Installing required dependencies... >> dist\electron-canvas-draw\start.bat
echo call npm install --no-audit >> dist\electron-canvas-draw\start.bat
echo echo Starting Canvas Drawing App... >> dist\electron-canvas-draw\start.bat
echo call npm start >> dist\electron-canvas-draw\start.bat

echo.
echo 7. Creating a standalone zip file...
if exist "dist\electron-canvas-draw.zip" del "dist\electron-canvas-draw.zip"
powershell -Command "Compress-Archive -Path 'dist\electron-canvas-draw' -DestinationPath 'dist\electron-canvas-draw.zip'"

echo.
echo Build completed successfully!
echo.
echo You can find the application in the following locations:
echo.
echo 1. Standalone folder: dist\electron-canvas-draw
echo    - Run it by opening this folder and executing start.bat
echo.
echo 2. Zip archive: dist\electron-canvas-draw.zip
echo    - Extract the zip file anywhere and run start.bat inside it
echo.
pause
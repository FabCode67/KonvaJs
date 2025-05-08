@echo off
echo Building portable Electron app...
echo.

echo Building Next.js static files...
call npm run build

echo.
echo Creating directories...
if not exist "dist" mkdir dist
if not exist "dist\electron-app" mkdir dist\electron-app
if not exist "dist\electron-app\out" mkdir dist\electron-app\out

echo.
echo Copying Next.js output to dist folder...
xcopy /E /I /Y out dist\electron-app\out

echo.
echo Copying Electron files...
copy main.js dist\electron-app\
copy preload.js dist\electron-app\
copy package-standalone.json dist\electron-app\package.json

echo.
echo Creating start.bat file...
echo @echo off > dist\electron-app\start.bat
echo echo Starting Electron Canvas Draw App... >> dist\electron-app\start.bat
echo npx electron . >> dist\electron-app\start.bat

echo.
echo Build completed!
echo The portable app is in the 'dist\electron-app' folder.
echo To run it, double-click on the 'start.bat' file in that folder.
echo.
pause

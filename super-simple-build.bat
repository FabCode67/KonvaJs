@echo off
echo Building super simple Electron Canvas Drawing App...
echo.

echo 1. Building Next.js static files...
call npm run build

echo.
echo 2. Creating standalone app folder...
if not exist "dist" mkdir dist
if not exist "dist\simple-electron-canvas" mkdir dist\simple-electron-canvas
if not exist "dist\simple-electron-canvas\out" mkdir dist\simple-electron-canvas\out

echo.
echo 3. Copying files to standalone app folder...
xcopy /E /I /Y out dist\simple-electron-canvas\out
copy simple-main.js dist\simple-electron-canvas\simple-main.js
copy simplified-package.json dist\simple-electron-canvas\package.json

echo.
echo 4. Creating debug start.bat...
echo @echo off > dist\simple-electron-canvas\start.bat
echo echo Installing Electron... >> dist\simple-electron-canvas\start.bat
echo call npm install --no-audit >> dist\simple-electron-canvas\start.bat
echo echo. >> dist\simple-electron-canvas\start.bat
echo echo Starting Canvas Drawing App... >> dist\simple-electron-canvas\start.bat
echo echo This window will stay open to show any errors. >> dist\simple-electron-canvas\start.bat
echo call npm start >> dist\simple-electron-canvas\start.bat
echo echo. >> dist\simple-electron-canvas\start.bat
echo echo Application has exited with code: %%ERRORLEVEL%% >> dist\simple-electron-canvas\start.bat
echo echo Press any key to exit... >> dist\simple-electron-canvas\start.bat
echo pause ^> nul >> dist\simple-electron-canvas\start.bat

echo.
echo 5. Creating a standalone zip file...
if exist "dist\simple-electron-canvas.zip" del "dist\simple-electron-canvas.zip"
powershell -Command "Compress-Archive -Path 'dist\simple-electron-canvas' -DestinationPath 'dist\simple-electron-canvas.zip'"

echo.
echo Build completed successfully!
echo.
echo You can find the simplified application in:
echo dist\simple-electron-canvas
echo.
echo Or you can distribute the zip file:
echo dist\simple-electron-canvas.zip
echo.
pause
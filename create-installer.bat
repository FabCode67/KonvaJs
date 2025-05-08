@echo off
echo Creating installer for Canvas Drawing App...
echo.

echo 1. Installing electron-packager and electron-winstaller...
call npm install -g electron-packager electron-winstaller

echo.
echo 2. Building Next.js static files if needed...
call npm run build

echo.
echo 3. Creating temporary folder for packaging...
if not exist "temp" mkdir temp
if not exist "temp\out" mkdir temp\out

echo.
echo 4. Copying files to temporary folder...
xcopy /E /I /Y out temp\out
copy simple-main.js temp\main.js
copy simplified-package.json temp\package.json

echo.
echo 5. Installing dependencies in temporary folder...
cd temp
call npm install --production
cd ..

echo.
echo 6. Creating executable with electron-packager...
call electron-packager temp "Canvas Drawing App" --platform=win32 --arch=x64 --out=dist --icon=icon.ico --asar --overwrite

echo.
echo 7. Creating installer script...
echo var electronInstaller = require('electron-winstaller'); > create-windows-installer.js
echo. >> create-windows-installer.js
echo // NB: Use this syntax within an async function, Node does not have support for >> create-windows-installer.js
echo // top-level await ^ >> create-windows-installer.js
echo electronInstaller.createWindowsInstaller({ >> create-windows-installer.js
echo   appDirectory: './dist/Canvas Drawing App-win32-x64', >> create-windows-installer.js
echo   outputDirectory: './dist/installer', >> create-windows-installer.js
echo   authors: 'Your Name', >> create-windows-installer.js
echo   description: 'A simple drawing application using Electron and HTML Canvas', >> create-windows-installer.js
echo   exe: 'Canvas Drawing App.exe', >> create-windows-installer.js
echo   setupExe: 'Canvas_Drawing_App_Setup.exe', >> create-windows-installer.js
echo   setupIcon: './icon.ico', >> create-windows-installer.js
echo   noMsi: true >> create-windows-installer.js
echo }).then(() => { >> create-windows-installer.js
echo   console.log('Installer created successfully!'); >> create-windows-installer.js
echo }).catch(e => { >> create-windows-installer.js
echo   console.error(`Error creating installer: ${e.message}`); >> create-windows-installer.js
echo }); >> create-windows-installer.js

echo.
echo 8. Running installer script...
call node create-windows-installer.js

echo.
echo 9. Cleaning up temporary files...
rmdir /S /Q temp

echo.
echo Installer creation completed!
echo.
echo You can find the installer in:
echo dist\installer\Canvas_Drawing_App_Setup.exe
echo.
pause

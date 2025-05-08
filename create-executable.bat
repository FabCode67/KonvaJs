@echo off
echo Creating executable for Canvas Drawing App...
echo.

echo 1. Installing electron-packager globally...
call npm install -g electron-packager

echo.
echo 2. Building Next.js static files...
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
echo 7. Cleaning up temporary files...
rmdir /S /Q temp

echo.
echo Executable creation completed!
echo.
echo You can find the standalone executable in:
echo dist\Canvas Drawing App-win32-x64\Canvas Drawing App.exe
echo.
echo This folder contains everything needed to run the application.
echo You can distribute this entire folder or create an installer with it.
echo.
pause

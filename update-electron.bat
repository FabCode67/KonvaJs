@echo off
echo Updating Electron version to fix build issues...
echo.

echo Removing old Electron version...
call npm uninstall electron

echo.
echo Installing new Electron version...
call npm install --save-dev electron@25.9.0

echo.
echo Clearing npm cache...
call npm cache clean --force

echo.
echo Update completed!
echo.
echo To build the executable, run:
echo build-exe.bat
echo.
pause

@echo off
echo Creating log file...
echo Starting application debug log > debug-log.txt
echo. >> debug-log.txt

echo Installing required dependencies...
echo Running: npm install --no-audit >> debug-log.txt
call npm install --no-audit >> debug-log.txt 2>&1
echo Dependency installation complete >> debug-log.txt
echo. >> debug-log.txt

echo Starting Canvas Drawing App...
echo Running: npm start >> debug-log.txt
call npm start >> debug-log.txt 2>&1

echo.
echo Application has exited with code: %ERRORLEVEL% >> debug-log.txt
echo Error code: %ERRORLEVEL%
echo.
echo Debug log has been saved to debug-log.txt
echo Please check this file for error messages.
echo.
echo Press any key to exit...
pause > nul

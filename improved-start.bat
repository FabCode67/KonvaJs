@echo off
echo Installing required dependencies...
call npm install --no-audit
echo.
echo Starting Canvas Drawing App...
call npm start

echo.
if %ERRORLEVEL% NEQ 0 (
  echo An error occurred while running the application.
  echo Error code: %ERRORLEVEL%
  echo.
  echo Press any key to exit...
  pause > nul
) else (
  echo Application closed normally.
  echo.
  echo Press any key to exit...
  pause > nul
)

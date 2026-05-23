@echo off
title Krishi-Sethu App Launcher
echo ===================================================
echo   Krishi-Sethu (ಕೃಷಿ ಸೇತು) App Launcher
echo ===================================================
echo.
echo Starting the local Earthy Premium agricultural application...
echo.

:: Check for node and npx
where npx >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Node.js/npx detected. Launching high-fidelity server via live-server...
    echo.
    echo Press Ctrl+C in this window to stop the server.
    echo.
    start "" "http://localhost:3000"
    npx -y live-server --port=3000
    goto end
)

:: Check for python as fallback
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Python detected. Launching server on port 3000...
    echo.
    echo Press Ctrl+C in this window to stop the server.
    echo.
    start "" "http://localhost:3000"
    python -m http.server 3000
    goto end
)

echo [ERROR] Neither Node.js (npx) nor Python could be found on your PATH.
echo Please install Node.js or Python to run this ES6 module-based application.
echo Alternatively, you can drag and drop index.html into a browser with web security disabled,
echo or upload the folder to any static hosting service.
echo.
pause

:end

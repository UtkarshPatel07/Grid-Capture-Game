@echo off
echo Starting Grid Capture Application...
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b %errorlevel%
)

echo.
echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Make sure MongoDB is running
echo 2. Open a terminal and run: cd backend ^&^& npm run dev
echo 3. Open another terminal and run: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:3000 in your browser
echo.
pause


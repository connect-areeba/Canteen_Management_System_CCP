@echo off
cls
echo =========================================================
echo  CAMPUS CANTEEN MANAGEMENT SYSTEM - LOCAL RUNNER
echo =========================================================
echo.
echo Checking for compiler (g++)...
where g++ >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] g++ is not installed or not in your PATH environment variable.
    echo Please install MinGW or GCC compiler to run C++ code locally.
    echo.
    pause
    exit /b
)

echo Compiling "FINAL CAMPUS CANTEEN MS (1).cpp" ...
g++ -std=c++11 -o canteen.exe "FINAL CAMPUS CANTEEN MS (1).cpp"

if %errorlevel% equ 0 (
    echo [SUCCESS] Compilation completed successfully!
    echo.
    echo Starting console program...
    echo ---------------------------------------------------------
    canteen.exe
) else (
    echo [ERROR] Compilation failed. Please check the code for syntax errors.
)
echo.
pause

@echo off
chcp 65001 > nul
title EduMaster English - CEFR Learning Platform

echo =======================================================
echo   🚀 KHỞI ĐỘNG EDUMASTER ENGLISH (CHUẨN CEFR A1 - C2)
echo =======================================================
echo.

set "PY_EXE=%LOCALAPPDATA%\Programs\Python\Python312\python.exe"

if exist "%PY_EXE%" (
    echo [✓] Đang khởi chạy máy chủ web qua Python...
    "%PY_EXE%" server.py
) else (
    where python >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo [✓] Đang khởi chạy máy chủ web qua Python hệ thống...
        python server.py
    ) else (
        echo [!] Khởi chạy trực tiếp file index.html qua trình duyệt...
        start "" index.html
    )
)

pause

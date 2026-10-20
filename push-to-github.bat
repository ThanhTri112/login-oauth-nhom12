@echo off
chcp 65001 >nul
echo ========================================================
echo   ĐANG TỰ ĐỘNG ĐẨY DỰ ÁN LÊN GITHUB (THANHTRI112)
echo ========================================================
echo.

git init
git add .
git commit -m "feat: login google and github nhom 12"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/ThanhTri112/login-oauth-nhom12.git

echo.
echo Đang đẩy mã nguồn lên https://github.com/ThanhTri112/login-oauth-nhom12 ...
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [THÀNH CÔNG] ĐÃ ĐẨY CODE LÊN GITHUB THÀNH CÔNG!
    echo   Xem tại: https://github.com/ThanhTri112/login-oauth-nhom12
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   [LƯU Ý] Nếu báo lỗi, bạn hãy chắc chắn rằng:
    echo   1. Bạn đã tạo repo "login-oauth-nhom12" trên https://github.com/new
    echo   2. Bạn đã đăng nhập tài khoản GitHub trên máy tính.
    echo ========================================================
)

echo.
pause

# Script tự động đẩy code lên GitHub cho ThanhTri112
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   ĐANG TỰ ĐỘNG ĐẨY DỰ ÁN LÊN GITHUB (THANHTRI112)" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

git init
git add .
git commit -m "feat: login google and github nhom 12"
git branch -M main

try {
    git remote remove origin 2>$null
} catch {}

git remote add origin https://github.com/ThanhTri112/login-oauth-nhom12.git

Write-Host "`nĐang đẩy code lên https://github.com/ThanhTri112/login-oauth-nhom12.git ...`n" -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================================" -ForegroundColor Green
    Write-Host "   [THÀNH CÔNG] ĐÃ ĐẨY CODE LÊN GITHUB THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "   Xem tại: https://github.com/ThanhTri112/login-oauth-nhom12" -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Green
} else {
    Write-Host "`n========================================================" -ForegroundColor Red
    Write-Host "   [LƯU Ý] Hãy chắc chắn bạn đã vào https://github.com/new và bấm 'Create repository' với tên 'login-oauth-nhom12' trước khi push nhé!" -ForegroundColor Yellow
    Write-Host "========================================================" -ForegroundColor Red
}

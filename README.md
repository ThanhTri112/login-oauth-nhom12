# BÀI TẬP: WEBSITE ĐĂNG NHẬP OAUTH 2.0 (GMAIL & GITHUB)

## 📌 THÔNG TIN NHÓM THỰC HIỆN: NHÓM 12
- **Nguyễn Thanh Trí** - MSSV: `DH52201632`
- **Trương Lý Quốc Toàn** - MSSV: `DH52201595`

---

## 🚀 CÁC TÍNH NĂNG CỦA ỨNG DỤNG
1. **Trang chủ đầy đủ thông tin**:
   - Hiển thị tên nhóm (Nhóm 12) và toàn bộ thành viên cùng MSSV.
   - Thẻ hiển thị trạng thái đăng nhập thời gian thực.
2. **Đăng nhập Gmail (Google) qua OAuth 2.0**:
   - Mở popup đăng nhập tài khoản Google chính thức.
   - Hiển thị Avatar, Tên đầy đủ, Địa chỉ Gmail, UID người dùng sau khi xác thực.
3. **Đăng nhập Mạng xã hội thứ 2: GitHub**:
   - Xác thực an toàn qua GitHub OAuth.
   - Lấy ảnh đại diện, username/họ tên và UID từ GitHub.
4. **Hỗ trợ Chế độ Demo / Thử nghiệm nhanh**:
   - Cho phép thầy cô hoặc người xem thử nghiệm trải nghiệm luồng đăng nhập ngay cả khi chưa nạp API key.
5. **Form cấu hình trực tiếp trên Web**:
   - Cho phép dán trực tiếp Firebase Config vào modal mà không cần cấu hình lại mã nguồn.

---

## 🛠 HƯỚNG DẪN CÀI ĐẶT & CHẠY LOCAL

### 1. Cài đặt thư viện:
Mở terminal trong thư mục dự án và chạy:
```bash
npm install
```

### 2. Chạy môi trường phát triển:
```bash
npm run dev
```
Trang web sẽ tự động mở tại: `http://localhost:3000`

---

## 🌐 HƯỚNG DẪN TẠO FIREBASE & GITHUB OAUTH ĐỂ TEST THẬT

### Bước 1: Tạo project Firebase
1. Vào [Firebase Console](https://console.firebase.google.com/) và tạo 1 Project mới (ví dụ: `oauth-nhom12`).
2. Vào menu bên trái: **Build** &rarr; **Authentication** &rarr; bấm **Get Started**.
3. Tại tab **Sign-in method**:
   - Chọn **Google** &rarr; Bật công tắc **Enable** &rarr; Lưu.
   - Chọn **GitHub** &rarr; Bật công tắc **Enable** &rarr; Giữ nguyên tab này để lấy *Authorization callback URL*.

### Bước 2: Tạo OAuth App trên GitHub
1. Vào [GitHub Developer Settings](https://github.com/settings/developers) &rarr; **OAuth Apps** &rarr; **New OAuth App**.
2. Điền:
   - *Application name*: `OAuth Nhom 12`
   - *Homepage URL*: `http://localhost:3000` (hoặc link Vercel của bạn)
   - *Authorization callback URL*: Copy đường dẫn callback URL từ Firebase ở Bước 1 dán vào đây.
3. Bấm **Register application**.
4. Bấm **Generate a new client secret**.
5. Copy **Client ID** và **Client Secret** dán ngược lại vào ô cấu hình GitHub trong Firebase &rarr; Bấm **Save**.

### Bước 3: Lấy Firebase Config
1. Trong Firebase Console, vào **Project Settings** (biểu tượng bánh răng ⚙️) &rarr; chọn tab **General**.
2. Cuộn xuống phần **Your apps** &rarr; bấm icon Web **`</>`** để đăng ký app web.
3. Copy đoạn mã JSON `firebaseConfig` và dán vào nút **"Hướng dẫn & Cấu hình"** ngay trên giao diện web của ứng dụng!

---

## 📤 HƯỚNG DẪN DEPLOY LẤY LINK NỘP BÀI (VERCEL)
1. Đẩy code lên GitHub cá nhân của bạn:
   ```bash
   git init
   git add .
   git commit -m "feat: login google and github nhom 12"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
   git push -u origin main
   ```
2. Truy cập [Vercel](https://vercel.com), đăng nhập bằng tài khoản GitHub.
3. Bấm **Add New** &rarr; **Project** &rarr; Chọn Repository vừa push &rarr; Bấm **Deploy**.
4. Sau 30 giây, bạn sẽ nhận được link website dạng: `https://your-project.vercel.app` &rarr; Copy link này nộp lên group cho thầy Hùng!

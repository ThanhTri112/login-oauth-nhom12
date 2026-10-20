<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ôn Thi Lập Trình Ứng Dụng Cơ Sở Dữ Liệu</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: #fff;
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
            text-align: center;
            max-width: 600px;
            width: 100%;
        }
        h1 {
            font-size: 2.2rem;
            margin-bottom: 10px;
            font-weight: 600;
        }
        p {
            color: #ddd;
            margin-bottom: 30px;
        }
        .btn-group {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .btn {
            display: block;
            padding: 15px 20px;
            background: #00adb5;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .btn:hover {
            background: #00f2fe;
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0, 242, 254, 0.4);
        }
        .btn-secondary {
            background: #393e46;
        }
        .btn-secondary:hover {
            background: #4e5561;
            box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }
        .footer {
            margin-top: 40px;
            font-size: 0.8rem;
            color: #bbb;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ÔN THI CUỐI KỲ</h1>
        <p>Môn học: Lập trình ứng dụng Cơ sở dữ liệu (JPA - Servlet - JSP)</p>
        
        <div class="btn-group">
            <a href="EmployeeController?act=list" class="btn">DẠNG ĐỀ 1: Xử lý bên Bảng Nhiều (Employee)</a>
            <a href="ProjectController?act=list" class="btn btn-secondary">DẠNG ĐỀ 2: Xử lý bên Bảng Một (Project)</a>
        </div>
        
        <div class="footer">
            Khoa CNTT – Trường ĐH Công nghệ Sài Gòn
        </div>
    </div>
</body>
</html>

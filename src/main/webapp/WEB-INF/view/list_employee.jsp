<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dạng Đề 1: Xử lý bên bảng Nhiều (Employee)</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f4f6f9;
            color: #333;
            margin: 0;
            padding: 30px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        h2 {
            color: #1e3c72;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
            margin-top: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .btn-home {
            font-size: 0.9rem;
            padding: 8px 15px;
            background: #393e46;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
            transition: background 0.3s;
        }
        .btn-home:hover {
            background: #222831;
        }
        /* Style Form */
        fieldset {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            background: #fafafa;
        }
        legend {
            font-weight: bold;
            color: #1e3c72;
            padding: 0 10px;
        }
        .form-group {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        .form-group label {
            width: 120px;
            font-weight: 600;
        }
        .form-group input[type="text"], .form-group select {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
        }
        .form-group input[type="radio"] {
            margin-right: 5px;
        }
        .radio-group {
            display: flex;
            gap: 20px;
        }
        .btn-submit {
            background: #00adb5;
            color: white;
            border: none;
            padding: 10px 25px;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .btn-submit:hover {
            background: #00f2fe;
        }
        /* Style Table */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table th, table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        table th {
            background-color: #1e3c72;
            color: white;
            font-weight: 600;
        }
        table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        table tr:hover {
            background-color: #f1f5f9;
        }
        .btn-delete {
            color: #d9534f;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s;
        }
        .btn-delete:hover {
            color: #c9302c;
            text-decoration: underline;
        }
        .query-box {
            background: #eef2f7;
            border-left: 4px solid #00adb5;
            padding: 15px;
            margin-bottom: 25px;
            border-radius: 0 8px 8px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .btn-query {
            background: #00adb5;
            color: #fff;
            text-decoration: none;
            padding: 8px 15px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.9rem;
            transition: background 0.3s;
        }
        .btn-query:hover {
            background: #008f96;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>
            DẠNG ĐỀ 1: QUẢN LÝ NHÂN VIÊN
            <a href="index.jsp" class="btn-home">Trang chủ</a>
        </h2>
        
        <!-- Câu 4: Nút kích hoạt câu JPQL lọc nhân viên nữ trong LMS -->
        <div class="query-box">
            <div>
                <strong>Câu hỏi 4 (JPQL Query):</strong> Lấy danh sách nhân viên nữ thuộc dự án "Nền tảng Đào tạo trực tuyến LMS".
                <c:if test="${isQ4}">
                    <br><span style="color: #d9534f;">* Đang hiển thị danh sách đã lọc bằng JPQL</span>
                </c:if>
            </div>
            <c:choose>
                <c:if test="${isQ4}">
                    <a href="EmployeeController?act=list" class="btn-query" style="background: #393e46;">Hiển thị tất cả</a>
                </c:if>
                <c:otherwise>
                    <a href="EmployeeController?act=q4" class="btn-query">Chạy JPQL Câu 4</a>
                </c:otherwise>
            </c:choose>
        </div>

        <!-- Câu 3: Thêm nhân viên (Form) -->
        <form method="post" action="EmployeeController?act=add">
            <fieldset>
                <legend>ADD EMPLOYEE</legend>
                
                <div class="form-group">
                    <label>Fullname:</label>
                    <input type="text" name="fname" required placeholder="Nhập họ và tên...">
                </div>
                
                <div class="form-group">
                    <label>Gen:</label>
                    <div class="radio-group">
                        <label style="width: auto; font-weight: normal;">
                            <input type="radio" name="gen" value="true" checked> Nam
                        </label>
                        <label style="width: auto; font-weight: normal;">
                            <input type="radio" name="gen" value="false"> Nữ
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Project:</label>
                    <select name="pid" required>
                        <c:forEach items="${projects}" var="p">
                            <option value="${p.id}">${p.name}</option>
                        </c:forEach>
                    </select>
                </div>
                
                <div style="text-align: right;">
                    <button type="submit" class="btn-submit">Add</button>
                </div>
            </fieldset>
        </form>

        <!-- Câu 1: Hiển thị danh sách nhân viên -->
        <h3>List Employees</h3>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Fullname</th>
                    <th>Gen</th>
                    <th>Project name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach items="${employees}" var="e">
                    <tr>
                        <td>${e.id}</td>
                        <td>${e.fullname}</td>
                        <td>
                            <c:choose>
                                <c:when test="${e.gen}">Nam</c:when>
                                <c:otherwise>Nữ</c:otherwise>
                            </c:choose>
                        </td>
                        <td>${e.project.name}</td>
                        <td>
                            <!-- Câu 2: Xóa nhân viên -->
                            <a href="EmployeeController?act=delete&id=${e.id}" class="btn-delete" 
                               onclick="return confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')">Delete</a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</body>
</html>

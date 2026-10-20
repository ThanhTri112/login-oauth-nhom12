<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dạng Đề 2: Xử lý bên bảng Một (Project)</title>
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
            color: #2b5298;
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
            color: #2b5298;
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
        .form-group input[type="text"], .form-group input[type="date"] {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
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
            background-color: #2b5298;
            color: white;
            font-weight: 600;
        }
        table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        table tr:hover {
            background-color: #f1f5f9;
        }
        .btn-view {
            color: #2b5298;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s;
        }
        .btn-view:hover {
            color: #00f2fe;
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
            DẠNG ĐỀ 2: QUẢN LÝ DỰ ÁN
            <a href="index.jsp" class="btn-home">Trang chủ</a>
        </h2>
        
        <!-- Câu 4: Nút kích hoạt câu JPQL lọc dự án hết hạn từ tháng 8 và >= 5 nhân viên -->
        <div class="query-box">
            <div>
                <strong>Câu hỏi 4 (JPQL Query):</strong> Lấy danh sách Dự án hết hạn từ tháng 8 và có số nhân viên từ 5 trở lên.
                <c:if test="${isQ4}">
                    <br><span style="color: #d9534f;">* Đang hiển thị danh sách đã lọc bằng JPQL</span>
                </c:if>
            </div>
            <c:choose>
                <c:if test="${isQ4}">
                    <a href="ProjectController?act=list" class="btn-query" style="background: #393e46;">Hiển thị tất cả</a>
                </c:if>
                <c:otherwise>
                    <a href="ProjectController?act=q4" class="btn-query">Chạy JPQL Câu 4</a>
                </c:otherwise>
            </c:choose>
        </div>

        <!-- Câu 2: Thêm dự án (Form) -->
        <form method="post" action="ProjectController?act=add">
            <fieldset>
                <legend>Add project</legend>
                
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" required placeholder="Nhập tên dự án...">
                </div>
                
                <div class="form-group">
                    <label>Deadline:</label>
                    <input type="date" name="deadline" required>
                </div>
                
                <div style="text-align: right;">
                    <button type="submit" class="btn-submit">Add</button>
                </div>
            </fieldset>
        </form>

        <!-- Câu 1: Hiển thị danh sách dự án -->
        <h3>List Projects</h3>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Deadline</th>
                    <th>Employees Size</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach items="${projects}" var="p">
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>
                            <fmt:formatDate value="${p.deadline}" pattern="dd/MM/yyyy"/>
                        </td>
                        <td style="text-align: center; font-weight: bold;">
                            ${p.listEmp.size()}
                        </td>
                        <td>
                            <!-- Câu 3: Xem chi tiết nhân viên của dự án -->
                            <c:choose>
                                <c:when test="${p.listEmp.size() > 0}">
                                    <a href="ProjectController?act=list-emp&id=${p.id}" class="btn-view">View</a>
                                </c:when>
                                <c:otherwise>
                                    <span style="color: #999;">Không có nhân viên</span>
                                </c:otherwise>
                            </c:choose>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Chi tiết nhân viên dự án: ${project.name}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f4f6f9;
            color: #333;
            margin: 0;
            padding: 30px;
        }
        .container {
            max-width: 700px;
            margin: 0 auto;
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        h2 {
            color: #2b5298;
            margin-top: 0;
        }
        h3 {
            color: #555;
            margin-bottom: 20px;
            border-bottom: 2px solid #2b5298;
            padding-bottom: 8px;
        }
        /* Style Table */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            margin-bottom: 25px;
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
        .btn-back {
            display: inline-block;
            background: #393e46;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-weight: bold;
            transition: background 0.3s;
        }
        .btn-back:hover {
            background: #222831;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Dự án: ${project.name}</h2>
        <h3>Danh sách nhân viên tham gia</h3>
        
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Fullname</th>
                    <th>Gen</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach items="${project.listEmp}" var="e">
                    <tr>
                        <td>${e.id}</td>
                        <td>${e.fullname}</td>
                        <td>
                            <c:choose>
                                <c:when test="${e.gen}">Nam</c:when>
                                <c:otherwise>Nữ</c:otherwise>
                            </c:choose>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
        
        <a href="ProjectController?act=list" class="btn-back">Quay lại danh sách dự án</a>
    </div>
</body>
</html>

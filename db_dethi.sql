-- Tạo Database
CREATE DATABASE IF NOT EXISTS db_cuoiky CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_cuoiky;

-- Xóa bảng cũ nếu tồn tại để tránh lỗi (xóa bảng nhiều trước, bảng một sau)
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS project;

-- 1. Tạo bảng một (project)
CREATE TABLE project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    deadline DATE NOT NULL
) ENGINE=InnoDB;

-- 2. Tạo bảng nhiều (employee)
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(50) NOT NULL,
    gen TINYINT(1) NOT NULL, -- 1: Nam, 0: Nữ (tương ứng boolean true/false)
    project_id INT,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Chèn dữ liệu mẫu cho bảng project
INSERT INTO project (id, name, deadline) VALUES
(1, 'Hệ thống Quản lý Bán lẻ Omnichannel', '2026-08-15'),
(2, 'Ứng dụng Ví điện tử Mobile Banking', '2026-10-20'),
(3, 'Nền tảng Đào tạo trực tuyến LMS', '2026-07-30'),
(4, 'Phần mềm Tối ưu Chuỗi cung ứng', '2026-12-10'),
(5, 'Hệ thống Chăm sóc khách hàng CRM', '2026-09-05'),
(6, 'khaho', '2026-05-22');

-- 4. Chèn dữ liệu mẫu cho bảng employee
INSERT INTO employee (id, fullname, gen, project_id) VALUES
(2, 'Trần Lê Phương Thảo', 0, 1), -- Nữ (0)
(3, 'Phạm Hoàng Gia Bảo', 1, 1), -- Nam (1)
(4, 'Lê Thị Tuyết Mai', 0, 2),    -- Nữ (0)
(5, 'Đặng Văn Quang', 1, 2),     -- Nam (1)
(6, 'Bùi Hồng Hạnh', 0, 2),      -- Nữ (0)
(8, 'Hoàng Thanh Trúc', 0, 3),    -- Nữ (0)
(9, 'Ngô Quốc Khánh', 1, 3),     -- Nam (1)
(10, 'Đỗ Hùng Dũng', 1, 4),      -- Nam (1)
(15, 'Trần Thị Diễm Hương', 0, 5),-- Nữ (0)
(16, 'Nguyễn Thế Vinh', 1, 5),    -- Nam (1)
(17, 'Lâm Mỹ Anh', 0, 5);         -- Nữ (0)

# Hướng dẫn Ôn thi môn Lập trình ứng dụng Cơ sở dữ liệu

Tài liệu này giải thích chi tiết hai dạng đề thi cuối kỳ thực hành (sử dụng **JPA - Servlet - JSP**). Mã nguồn mẫu đã được tạo sẵn trong thư mục làm việc của bạn.

---

## 1. Tìm hiểu mô hình CSDL & Quan hệ 1-n

Đề bài cho 2 bảng:
- **`project` (bảng Một)**: Chứa thông tin dự án (`id`, `name`, `deadline`).
- **`employee` (bảng Nhiều)**: Chứa thông tin nhân viên (`id`, `fullname`, `gen`, `project_id`).
- Một dự án có thể có **nhiều** nhân viên tham gia. Một nhân viên chỉ thuộc **một** dự án duy nhất.
- Trường `gen` kiểu `tinyint(1)` (trong SQL) tương ứng với kiểu `boolean` (trong Java): `true` là Nam, `false` là Nữ.

---

## 2. Giải thích chi tiết các câu hỏi trong đề

### DẠNG ĐỀ 1: Xử lý bên bảng nhiều (Employee)

#### Câu 1: Hiển thị danh sách đối tượng (bảng nhiều) (5đ)
- **Service (`EmployeeService.java`)**:
  Dùng JPA EntityManager để tạo câu truy vấn Select mọi Employee:
  ```java
  public List<Employee> getAll() {
      EntityManager em = HibernateUtil.getEmf().createEntityManager();
      return em.createQuery("SELECT e FROM Employee e", Employee.class).getResultList();
  }
  ```
- **Controller (`EmployeeController.java`)**:
  Nhận request, gọi service lấy dữ liệu, gán vào attribute của request rồi forward sang trang JSP:
  ```java
  List<Employee> list = empSer.getAll();
  request.setAttribute("employees", list);
  request.getRequestDispatcher("WEB-INF/view/list_employee.jsp").forward(request, response);
  ```
- **Giao diện (`list_employee.jsp`)**:
  Dùng thư viện thẻ JSTL `<c:forEach>` để lặp qua danh sách và hiển thị:
  ```jsp
  <c:forEach items="${employees}" var="e">
      <tr>
          <td>${e.id}</td>
          <td>${e.fullname}</td>
          <td>${e.gen ? 'Nam' : 'Nữ'}</td>
          <td>${e.project.name}</td>
          <td><a href="...&id=${e.id}">Delete</a></td>
      </tr>
  </c:forEach>
  ```

#### Câu 2: Xóa đối tượng theo id (2đ)
- **Service**: Tìm đối tượng bằng hàm `em.find()`, sau đó dùng `em.remove()` trong một Transaction (giao dịch):
  ```java
  tx.begin();
  Employee e = em.find(Employee.class, id);
  if (e != null) em.remove(e);
  tx.commit();
  ```
- **Controller**: Lấy tham số `id` từ URL, gọi hàm xóa của Service, sau đó redirect về trang hiển thị:
  ```java
  int id = Integer.parseInt(request.getParameter("id"));
  empSer.delete(id);
  response.sendRedirect("EmployeeController?act=list");
  ```

#### Câu 3: Thêm đối tượng (1.5đ)
- **Giao diện**: Form nhập thông tin nhân viên, Project chọn thông qua danh sách dropdown các dự án (`<select>`):
  ```html
  <select name="pid">
      <c:forEach items="${projects}" var="p">
          <option value="${p.id}">${p.name}</option>
      </c:forEach>
  </select>
  ```
- **Controller**: Nhận tham số từ form gửi lên (`fname`, `gen`, `pid`), tạo đối tượng `Employee`, gán `Project` tương ứng thông qua ID và gọi hàm `insert` của Service.

#### Câu 4: JPQL Lọc nhân viên nữ thuộc dự án "Nền tảng Đào tạo trực tuyến LMS" (1.5đ)
- **Câu lệnh JPQL**:
  ```sql
  SELECT e FROM Employee e WHERE e.gen = false AND e.project.name = 'Nền tảng Đào tạo trực tuyến LMS'
  ```
- **Giải thích**: 
  - `e.gen = false`: Lọc nhân viên Nữ.
  - `e.project.name`: Lọc trực tiếp thông qua quan hệ sang bảng `project` mà không cần viết câu lệnh JOIN phức tạp (đây chính là điểm mạnh của JPQL/HQL).

---

### DẠNG ĐỀ 2: Xử lý bên bảng một (Project)

#### Câu 1: Hiển thị danh sách đối tượng (bảng 1) (5đ)
- Tương tự như Dạng 1, sử dụng truy vấn:
  ```java
  public List<Project> getAll() {
      EntityManager em = HibernateUtil.getEmf().createEntityManager();
      return em.createQuery("SELECT p FROM Project p", Project.class).getResultList();
  }
  ```
- Trong trang JSP, để đếm số lượng nhân viên của dự án, ta chỉ cần gọi: `${p.listEmp.size()}` (vì ở lớp Project đã khai báo quan hệ `@OneToMany` chứa danh sách nhân viên).

#### Câu 2: Thêm đối tượng (2đ)
- Nhận thông tin tên dự án và ngày deadline từ form.
- Sử dụng `SimpleDateFormat` để chuyển chuỗi ngày tháng (`yyyy-MM-dd`) nhận từ input thành kiểu `Date` trong Java:
  ```java
  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
  Date deadline = sdf.parse(request.getParameter("deadline"));
  ```

#### Câu 3: Kích nút View -> Xuất danh sách nhân viên thuộc dự án (1.5đ)
- **Controller**: Tìm dự án bằng `findById(id)`, sau đó chuyển tiếp dữ liệu dự án (chứa danh sách `listEmp`) sang trang hiển thị chi tiết (`list_project_employees.jsp`).
- **Giao diện**: Lặp qua danh sách nhân viên của dự án đó:
  ```jsp
  <c:forEach items="${project.listEmp}" var="e">
      <tr>
          <td>${e.id}</td>
          <td>${e.fullname}</td>
          <td>${e.gen ? 'Nam' : 'Nữ'}</td>
      </tr>
  </c:forEach>
  ```

#### Câu 4: JPQL Lọc dự án hết hạn từ tháng 8 và có số nhân viên từ 5 trở lên (1.5đ)
- **Câu lệnh JPQL**:
  ```sql
  SELECT p FROM Project p WHERE MONTH(p.deadline) >= 8 AND SIZE(p.listEmp) >= 5
  ```
- **Giải thích**:
  - `MONTH(p.deadline)`: Hàm trong JPQL dùng để trích xuất tháng từ trường deadline kiểu Date.
  - `SIZE(p.listEmp)`: Hàm trong JPQL dùng để lấy số lượng phần tử của danh sách liên kết `listEmp`.

---

## 3. Cách chạy thử dự án trên Eclipse

1. **Khởi động CSDL**:
   - Chạy XAMPP và khởi động **Apache** và **MySQL**.
   - Mở phpMyAdmin (`http://localhost:8080` nếu chạy theo script trước, hoặc `http://localhost/phpmyadmin` nếu dùng cổng mặc định).
   - Tạo database `db_cuoiky` và **Import** file `db_dethi.sql` mà tôi đã tạo trong thư mục dự án của bạn.

2. **Import dự án vào Eclipse**:
   - Mở Eclipse -> Chọn **File** -> **Import** -> **Existing Maven Projects** (hoặc General -> Existing Projects into Workspace).
   - Chọn đường dẫn thư mục dự án: `C:\Users\Nguyen Thanh Tri\Documents\antigravity\hopeful-salk`.

3. **Chạy dự án**:
   - Click chuột phải vào dự án -> **Run As** -> **Run on Server**.
   - Chọn máy chủ **Apache Tomcat v9.0** và nhấn **Finish**.

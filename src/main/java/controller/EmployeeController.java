package controller;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Employee;
import model.Project;
import service.EmployeeService;
import service.ProjectService;

@WebServlet("/EmployeeController")
public class EmployeeController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    private EmployeeService empSer = new EmployeeService();
    private ProjectService proSer = new ProjectService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String act = request.getParameter("act");
        if (act == null) {
            act = "list";
        }

        switch (act) {
            case "list":
                // Câu 1: Hiển thị danh sách nhân viên
                List<Employee> listEmp = empSer.getAll();
                // Lấy thêm danh sách project để hiển thị trong thẻ <select> của Form thêm nhân viên
                List<Project> listPro = proSer.getAll();
                
                request.setAttribute("employees", listEmp);
                request.setAttribute("projects", listPro);
                request.setAttribute("isQ4", false);
                
                request.getRequestDispatcher("WEB-INF/view/list_employee.jsp").forward(request, response);
                break;
                
            case "delete":
                // Câu 2: Xóa nhân viên theo ID
                try {
                    int id = Integer.parseInt(request.getParameter("id"));
                    empSer.delete(id);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                response.sendRedirect("EmployeeController?act=list");
                break;
                
            case "q4":
                // Câu 4 Dạng 1: Truy vấn nhân viên nữ thuộc dự án "Nền tảng Đào tạo trực tuyến LMS"
                List<Employee> listQ4 = empSer.getFemaleEmployeesInLMS();
                request.setAttribute("employees", listQ4);
                request.setAttribute("isQ4", true);
                
                request.getRequestDispatcher("WEB-INF/view/list_employee.jsp").forward(request, response);
                break;
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        String act = request.getParameter("act");
        
        if ("add".equals(act)) {
            // Câu 3: Thêm nhân viên mới
            try {
                String fullname = request.getParameter("fname");
                boolean gen = Boolean.parseBoolean(request.getParameter("gen"));
                int pid = Integer.parseInt(request.getParameter("pid"));
                
                // Tạo đối tượng Project chứa ID
                Project project = new Project();
                project.setId(pid);
                
                // Tạo đối tượng Employee mới
                Employee employee = new Employee();
                employee.setFullname(fullname);
                employee.setGen(gen);
                employee.setProject(project);
                
                // Thêm vào CSDL
                empSer.insert(employee);
            } catch (Exception e) {
                e.printStackTrace();
            }
            response.sendRedirect("EmployeeController?act=list");
        }
    }
}

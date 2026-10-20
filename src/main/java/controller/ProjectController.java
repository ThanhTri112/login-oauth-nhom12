package controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Project;
import service.ProjectService;

@WebServlet("/ProjectController")
public class ProjectController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    private ProjectService proSer = new ProjectService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String act = request.getParameter("act");
        if (act == null) {
            act = "list";
        }

        switch (act) {
            case "list":
                // Câu 1 Dạng 2: Hiển thị danh sách dự án
                List<Project> listPro = proSer.getAll();
                request.setAttribute("projects", listPro);
                request.setAttribute("isQ4", false);
                request.getRequestDispatcher("WEB-INF/view/list_project.jsp").forward(request, response);
                break;
                
            case "list-emp":
                // Câu 3 Dạng 2: Xem danh sách nhân viên thuộc dự án
                try {
                    int pid = Integer.parseInt(request.getParameter("id"));
                    Project project = proSer.findById(pid);
                    request.setAttribute("project", project);
                    request.getRequestDispatcher("WEB-INF/view/list_project_employees.jsp").forward(request, response);
                } catch (Exception e) {
                    e.printStackTrace();
                    response.sendRedirect("ProjectController?act=list");
                }
                break;
                
            case "q4":
                // Câu 4 Dạng 2: Dự án hết hạn từ tháng 8 và có số nhân viên từ 5 trở lên
                List<Project> listQ4 = proSer.getProjectsExpiringFromAugustWithAtLeast5Employees();
                request.setAttribute("projects", listQ4);
                request.setAttribute("isQ4", true);
                request.getRequestDispatcher("WEB-INF/view/list_project.jsp").forward(request, response);
                break;
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        String act = request.getParameter("act");
        
        if ("add".equals(act)) {
            // Câu 2 Dạng 2: Thêm dự án mới
            try {
                String name = request.getParameter("name");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Date deadline;
                try {
                    deadline = sdf.parse(request.getParameter("deadline"));
                } catch (ParseException e) {
                    deadline = new Date(); // Mặc định là ngày hiện tại nếu lỗi định dạng
                }
                
                Project project = new Project();
                project.setName(name);
                project.setDeadline(deadline);
                
                proSer.insert(project);
            } catch (Exception e) {
                e.printStackTrace();
            }
            response.sendRedirect("ProjectController?act=list");
        }
    }
}

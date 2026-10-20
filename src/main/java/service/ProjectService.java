package service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;
import model.Project;
import util.HibernateUtil;

public class ProjectService {

    // Câu 1 Dạng 2: Hiển thị danh sách đối tượng (bảng 1)
    public List<Project> getAll() {
        EntityManager em = HibernateUtil.getEmf().createEntityManager();
        try {
            TypedQuery<Project> query = em.createQuery("SELECT p FROM Project p", Project.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    // Câu 2 Dạng 2: Thêm đối tượng project
    public void insert(Project p) {
        EntityManager em = HibernateUtil.getEmf().createEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            em.persist(p);
            tx.commit();
        } catch (Exception ex) {
            if (tx.isActive()) tx.rollback();
            ex.printStackTrace();
        } finally {
            em.close();
        }
    }

    // Câu 3 Dạng 2: Tìm đối tượng theo id để hiển thị danh sách nhân viên thuộc dự án
    public Project findById(int id) {
        EntityManager em = HibernateUtil.getEmf().createEntityManager();
        try {
            return em.find(Project.class, id);
        } finally {
            em.close();
        }
    }

    // Câu 4 Dạng 2: Dùng JPQL truy vấn danh sách Dự án hết hạn từ tháng 8 và có số nhân viên từ 5 trở lên
    // Giải thích JPQL:
    // - MONTH(p.deadline) >= 8: Hàm MONTH() trích xuất tháng từ trường deadline (kiểu Date) và so sánh lớn hơn hoặc bằng 8.
    // - SIZE(p.listEmp) >= 5: Hàm SIZE() trả về số lượng phần tử của Collection (ở đây là danh sách nhân viên listEmp của dự án).
    public List<Project> getProjectsExpiringFromAugustWithAtLeast5Employees() {
        EntityManager em = HibernateUtil.getEmf().createEntityManager();
        try {
            String jpql = "SELECT p FROM Project p WHERE MONTH(p.deadline) >= 8 AND SIZE(p.listEmp) >= 5";
            TypedQuery<Project> query = em.createQuery(jpql, Project.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }
}

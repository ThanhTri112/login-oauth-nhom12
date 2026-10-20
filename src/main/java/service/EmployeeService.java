package service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;
import model.Employee;
import util.HibernateUtil;

public class EmployeeService {

    // Câu 1 Dạng 1: Hiển thị danh sách đối tượng (bảng nhiều)
    public List<Employee> getAll() {
        EntityManager em = HibernateUtil.getEmf().createEntityManager();
        try {
            TypedQuery<Employee> query = em.createQuery("SELECT e FROM Employee e", Employee.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    // Câu 2 Dạng 1: Xóa đối tượng theo id
    public void delete(int id) {
        EntityManager em = HibernateUtil.getEmf().createEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            Employee e = em.find(Employee.class, id);
            if (e != null) {
                em.remove(e);
            }
            tx.commit();
        } catch (Exception ex) {
            if (tx.isActive()) tx.rollback();
            ex.printStackTrace();
        } finally {
            em.close();
        }
    }

    // Câu 3 Dạng 1: Thêm đối tượng
    public void insert(Employee e) {
        EntityManager em = HibernateUtil.getEmf().createEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            // Cần merge đối tượng Project liên kết để tránh lỗi TransientObjectException
            if (e.getProject() != null) {
                e.setProject(em.merge(e.getProject()));
            }
            em.persist(e);
            tx.commit();
        } catch (Exception ex) {
            if (tx.isActive()) tx.rollback();
            ex.printStackTrace();
        } finally {
            em.close();
        }
    }

    // Câu 4 Dạng 1: Dùng JPQL truy vấn danh sách đối tượng nhân viên nữ thuộc dự án "Nền tảng Đào tạo trực tuyến LMS"
    // Giải thích JPQL:
    // - e.gen = false: Lọc nhân viên nữ (Nữ là false)
    // - e.project.name = '...': Lọc theo tên của dự án liên kết
    public List<Employee> getFemaleEmployeesInLMS() {
        EntityManager em = HibernateUtil.getEmf().createEntityManager();
        try {
            String jpql = "SELECT e FROM Employee e WHERE e.gen = false AND e.project.name = 'Nền tảng Đào tạo trực tuyến LMS'";
            TypedQuery<Employee> query = em.createQuery(jpql, Employee.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }
}

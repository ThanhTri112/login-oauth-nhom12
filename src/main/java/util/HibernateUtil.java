package util;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class HibernateUtil {
    private static EntityManagerFactory emf;

    public static EntityManagerFactory getEmf() {
        if (emf == null) {
            try {
                // Khởi tạo EntityManagerFactory từ persistence-unit tên "demau"
                emf = Persistence.createEntityManagerFactory("demau");
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("Lỗi khởi tạo EntityManagerFactory!");
            }
        }
        return emf;
    }

    public static void shutdown() {
        if (emf != null && emf.isOpen()) {
            emf.close();
        }
    }
}

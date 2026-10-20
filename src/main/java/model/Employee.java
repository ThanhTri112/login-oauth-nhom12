package model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "employee")
public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String fullname;

    // gen = true (Nam), gen = false (Nữ)
    private boolean gen;

    // Cấu hình cho Dạng đề 1 (bảng Nhiều chứa liên kết tới bảng Một)
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    // Constructors
    public Employee() {}

    public Employee(int id, String fullname, boolean gen) {
        this.id = id;
        this.fullname = fullname;
        this.gen = gen;
    }

    public Employee(int id, String fullname, boolean gen, Project project) {
        this.id = id;
        this.fullname = fullname;
        this.gen = gen;
        this.project = project;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public boolean isGen() {
        return gen;
    }

    public void setGen(boolean gen) {
        this.gen = gen;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}

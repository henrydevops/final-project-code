package com.example.teacherapp.model;

import javax.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "teachers")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "is_substitute", nullable = false)
    @JsonProperty("isSubstitute")
    private boolean isSubstitute;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Teacher() {}

    public Teacher(String name, boolean isSubstitute) {
        this.name = name;
        this.isSubstitute = isSubstitute;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public boolean isSubstitute() { return isSubstitute; }
    public void setSubstitute(boolean substitute) { isSubstitute = substitute; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}

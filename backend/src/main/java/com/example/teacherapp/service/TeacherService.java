package com.example.teacherapp.service;

import com.example.teacherapp.model.Teacher;
import com.example.teacherapp.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }
    
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
    
    public Teacher saveTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }
}
package com.example.Escola_WEB2.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "grade_disciplinas")
public class Grade_disciplinas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grade")
    private Integer id_grade;

    @ManyToOne
    @JoinColumn(name = "id_turma_fk")
    private Turmas turmas;

    @ManyToOne
    @JoinColumn(name = "id_disciplina_fk")
    private Disciplinas disciplinas;

    @ManyToOne
    @JoinColumn(name = "id_professor_fk")
    private Funcionarios funcionarios;

    private String horario;

    public Grade_disciplinas() {
    }

    public Grade_disciplinas(Integer id_grade, Turmas turmas, Disciplinas disciplinas, Funcionarios funcionarios, String horario) {
        this.id_grade = id_grade;
        this.turmas = turmas;
        this.disciplinas = disciplinas;
        this.funcionarios = funcionarios;
        this.horario = horario;
    }

    public Integer getId_grade() {
        return id_grade;
    }

    public void setId_grade(Integer id_grade) {
        this.id_grade = id_grade;
    }

    public Turmas getTurmas() {
        return turmas;
    }

    public void setTurmas(Turmas turmas) {
        this.turmas = turmas;
    }

    public Disciplinas getDisciplinas() {
        return disciplinas;
    }

    public void setDisciplinas(Disciplinas disciplinas) {
        this.disciplinas = disciplinas;
    }

    public Funcionarios getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(Funcionarios funcionarios) {
        this.funcionarios = funcionarios;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

}

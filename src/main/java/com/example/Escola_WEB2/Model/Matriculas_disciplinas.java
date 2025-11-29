package com.example.Escola_WEB2.Model;

import com.example.Escola_WEB2.Enums.Status_disciplina;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "matriculas_disciplinas")
public class Matriculas_disciplinas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_matricula")
    private Integer id_matricula;

    @ManyToOne
    @JoinColumn(name = "id_aluno_fk")
    private Alunos alunos;

    @ManyToOne
    @JoinColumn(name = "id_grade_fk")
    private Grade_disciplinas gradeDisciplinas;

    private String disciplinaCodigo;

    private int notaFinal;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status_disciplina statusDisciplina;

    public Matriculas_disciplinas() {
    }

    public Matriculas_disciplinas(Integer id_matricula, Alunos alunos, Grade_disciplinas gradeDisciplinas, String disciplinaCodigo, int notaFinal, Status_disciplina statusDisciplina) {
        this.id_matricula = id_matricula;
        this.alunos = alunos;
        this.gradeDisciplinas = gradeDisciplinas;
        this.disciplinaCodigo = disciplinaCodigo;
        this.notaFinal = notaFinal;
        this.statusDisciplina = statusDisciplina;
    }

    public Integer getId_matricula() {
        return id_matricula;
    }

    public void setId_matricula(Integer id_matricula) {
        this.id_matricula = id_matricula;
    }

    public Alunos getAlunos() {
        return alunos;
    }

    public void setAlunos(Alunos alunos) {
        this.alunos = alunos;
    }

    public Grade_disciplinas getGradeDisciplinas() {
        return gradeDisciplinas;
    }

    public void setGradeDisciplinas(Grade_disciplinas gradeDisciplinas) {
        this.gradeDisciplinas = gradeDisciplinas;
    }

    public String getDisciplinaCodigo() {
        return disciplinaCodigo;
    }

    public void setDisciplinaCodigo(String disciplinaCodigo) {
        this.disciplinaCodigo = disciplinaCodigo;
    }

    public int getNotaFinal() {
        return notaFinal;
    }

    public void setNotaFinal(int notaFinal) {
        this.notaFinal = notaFinal;
    }

    public Status_disciplina getStatusDisciplina() {
        return statusDisciplina;
    }

    public void setStatusDisciplina(Status_disciplina statusDisciplina) {
        this.statusDisciplina = statusDisciplina;
    }

}

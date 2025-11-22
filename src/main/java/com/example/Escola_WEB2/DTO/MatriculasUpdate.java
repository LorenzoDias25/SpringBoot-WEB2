package com.example.Escola_WEB2.DTO;

public class MatriculasUpdate {

    private Integer id_matricula;
    private Integer id_aluno;
    private Integer id_grade;
    private String codigo;
    private Integer nota_final;
    private String status;

    public MatriculasUpdate() {
    }

    public MatriculasUpdate(Integer id_matricula, Integer id_aluno, Integer id_grade, String codigo, Integer nota_final, String status) {
        this.id_matricula = id_matricula;
        this.id_aluno = id_aluno;
        this.id_grade = id_grade;
        this.codigo = codigo;
        this.nota_final = nota_final;
        this.status = status;
    }

    public Integer getId_matricula() {
        return id_matricula;
    }

    public void setId_matricula(Integer id_matricula) {
        this.id_matricula = id_matricula;
    }

    public Integer getId_aluno() {
        return id_aluno;
    }

    public void setId_aluno(Integer id_aluno) {
        this.id_aluno = id_aluno;
    }

    public Integer getId_grade() {
        return id_grade;
    }

    public void setId_grade(Integer id_grade) {
        this.id_grade = id_grade;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getNota_final() {
        return nota_final;
    }

    public void setNota_final(Integer nota_final) {
        this.nota_final = nota_final;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}

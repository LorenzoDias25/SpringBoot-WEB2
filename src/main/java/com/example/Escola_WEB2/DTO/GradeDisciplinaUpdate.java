package com.example.Escola_WEB2.DTO;

public class GradeDisciplinaUpdate {

    private Integer id_turma;
    private Integer id_disciplina;
    private Integer id_funcionario;
    private String horario;

    public GradeDisciplinaUpdate() {
    }

    public GradeDisciplinaUpdate(Integer id_turma, Integer id_disciplina, Integer id_funcionario, String horario) {
        this.id_turma = id_turma;
        this.id_disciplina = id_disciplina;
        this.id_funcionario = id_funcionario;
        this.horario = horario;
    }

    public Integer getId_turma() {
        return id_turma;
    }

    public void setId_turma(Integer id_turma) {
        this.id_turma = id_turma;
    }

    public Integer getId_disciplina() {
        return id_disciplina;
    }

    public void setId_disciplina(Integer id_disciplina) {
        this.id_disciplina = id_disciplina;
    }

    public Integer getId_funcionario() {
        return id_funcionario;
    }

    public void setId_funcionario(Integer id_funcionario) {
        this.id_funcionario = id_funcionario;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

}

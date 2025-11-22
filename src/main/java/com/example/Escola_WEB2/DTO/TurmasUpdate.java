package com.example.Escola_WEB2.DTO;

public class TurmasUpdate {

    private String codigo;
    private String nome;
    private String turno;
    private Double semestre;

    public TurmasUpdate() {
    }

    public TurmasUpdate(String codigo, String nome, String turno, Double semestre) {
        this.codigo = codigo;
        this.nome = nome;
        this.turno = turno;
        this.semestre = semestre;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }

    public Double getSemestre() {
        return semestre;
    }

    public void setSemestre(Double semestre) {
        this.semestre = semestre;
    }

}

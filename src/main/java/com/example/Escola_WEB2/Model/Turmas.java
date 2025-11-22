package com.example.Escola_WEB2.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "turmas")
public class Turmas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_turma")
    private Integer id_turma;

    @Column(name = "codigo", unique = true)
    private String codigo;

    private String nome;

    private String turno;

    private Double semestre;

    public Turmas() {
    }

    public Turmas(Integer id_turma, String codigo, String nome, String turno, Double semestre) {
        this.id_turma = id_turma;
        this.codigo = codigo;
        this.nome = nome;
        this.turno = turno;
        this.semestre = semestre;
    }

    public Integer getId_turma() {
        return id_turma;
    }

    public void setId_turma(Integer id_turma) {
        this.id_turma = id_turma;
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

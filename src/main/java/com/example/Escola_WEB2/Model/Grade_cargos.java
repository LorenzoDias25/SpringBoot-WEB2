package com.example.Escola_WEB2.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "grade_cargos")
public class Grade_cargos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cargo")
    private Integer id_cargo;

    private String nome;

    private Double hora_trabalho;

    private Double salario_base;

    private String beneficios;

    public Grade_cargos() {
    }

    public Grade_cargos(Integer id_cargo, String nome, Double hora_trabalho, Double salario_base, String beneficios) {
        this.id_cargo = id_cargo;
        this.nome = nome;
        this.hora_trabalho = hora_trabalho;
        this.salario_base = salario_base;
        this.beneficios = beneficios;
    }

    public Integer getId_cargo() {
        return id_cargo;
    }

    public void setId_cargo(Integer id_cargo) {
        this.id_cargo = id_cargo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getHora_trabalho() {
        return hora_trabalho;
    }

    public void setHora_trabalho(Double hora_trabalho) {
        this.hora_trabalho = hora_trabalho;
    }

    public Double getSalario_base() {
        return salario_base;
    }

    public void setSalario_base(Double salario_base) {
        this.salario_base = salario_base;
    }

    public String getBeneficios() {
        return beneficios;
    }

    public void setBeneficios(String beneficios) {
        this.beneficios = beneficios;
    }

}

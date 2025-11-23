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
    private Integer id;

    private String nome;

    private Double hora_trabalho;

    private Double salario_base;

    private String beneficios;

    public Grade_cargos() {
    }

    public Grade_cargos(Integer id, String nome, Double hora_trabalho, Double salario_base, String beneficios) {
        this.id = id;
        this.nome = nome;
        this.hora_trabalho = hora_trabalho;
        this.salario_base = salario_base;
        this.beneficios = beneficios;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

package com.example.Escola_WEB2.DTO;

import java.time.LocalDate;

public class FuncionariosUpdate {

    private String codigo;
    private String nome;
    private String cpf;
    private String email;
    private int celular;
    private LocalDate data_nascimento;

    private Integer id_cargo;

    public FuncionariosUpdate() {
    }

    public FuncionariosUpdate(String codigo, String nome, String cpf, String email, int celular, LocalDate data_nascimento, Integer id_cargo) {
        this.codigo = codigo;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.celular = celular;
        this.data_nascimento = data_nascimento;
        this.id_cargo = id_cargo;
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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getCelular() {
        return celular;
    }

    public void setCelular(int celular) {
        this.celular = celular;
    }

    public LocalDate getData_nascimento() {
        return data_nascimento;
    }

    public void setData_nascimento(LocalDate data_nascimento) {
        this.data_nascimento = data_nascimento;
    }

    public Integer getId_cargo() {
        return id_cargo;
    }

    public void setId_cargo(Integer id_cargo) {
        this.id_cargo = id_cargo;
    }

}

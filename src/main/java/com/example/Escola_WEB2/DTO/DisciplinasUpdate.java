package com.example.Escola_WEB2.DTO;

public class DisciplinasUpdate {

    private String codigo;
    private String nome;
    private int carga_horaria;
    private int valor;

    public DisciplinasUpdate() {
    }

    public DisciplinasUpdate(String codigo, String nome, int carga_horaria, int valor) {
        this.codigo = codigo;
        this.nome = nome;
        this.carga_horaria = carga_horaria;
        this.valor = valor;
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

    public int getCarga_horaria() {
        return carga_horaria;
    }

    public void setCarga_horaria(int carga_horaria) {
        this.carga_horaria = carga_horaria;
    }

    public int getValor() {
        return valor;
    }

    public void setValor(int valor) {
        this.valor = valor;
    }

}

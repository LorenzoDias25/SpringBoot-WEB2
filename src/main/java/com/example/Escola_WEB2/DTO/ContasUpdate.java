package com.example.Escola_WEB2.DTO;

public class ContasUpdate {

    private String codigo;
    private String tipo;
    private String email;
    private String senha;
    private boolean ativo;

    public ContasUpdate() {
    }

    public ContasUpdate(String codigo, String tipo, String email, String senha, boolean ativo) {
        this.codigo = codigo;
        this.tipo = tipo;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

}

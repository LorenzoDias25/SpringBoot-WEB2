package com.example.Escola_WEB2.Model;

import com.example.Escola_WEB2.Enums.Tipo_usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contas")
public class Contas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_conta")
    private Integer id_conta;

    @Column(name = "codigo", unique = true)
    private String codigo;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_usuario")
    private Tipo_usuario tipoUsuario;

    private String email;

    private String senha;

    private boolean ativo;

    public Contas() {
    }

    public Contas(Integer id_conta, String codigo, Tipo_usuario tipoUsuario, String email, String senha, boolean ativo) {
        this.id_conta = id_conta;
        this.codigo = codigo;
        this.tipoUsuario = tipoUsuario;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
    }

    public Integer getId_conta() {
        return id_conta;
    }

    public void setId_conta(Integer id_conta) {
        this.id_conta = id_conta;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Tipo_usuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(Tipo_usuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
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

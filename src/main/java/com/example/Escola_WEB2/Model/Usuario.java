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
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "contas")
public class Usuario implements UserDetails {

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

    // --- Métodos do UserDetails ---
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // O Spring precisa do prefixo "ROLE_" para funcionar no HTML

        if (this.tipoUsuario == null) {
            return List.of();
        }

        return List.of(new SimpleGrantedAuthority("ROLE_" + this.tipoUsuario.toString().toUpperCase()));
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.ativo;
    }

    public Usuario() {
    }

    public Usuario(Integer id_conta, String codigo, Tipo_usuario tipoUsuario, String email, String senha, boolean ativo) {
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

    @Override
    public String toString() {
        return "Usuario{" + "ID=" + id_conta + ", codigo=" + codigo + ", tipoUsuario=" + tipoUsuario + ", email=" + email + ", senha=" + senha + ", ativo=" + ativo + '}';
    }

}

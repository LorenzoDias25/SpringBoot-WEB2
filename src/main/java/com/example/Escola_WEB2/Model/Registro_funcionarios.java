package com.example.Escola_WEB2.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "registro_funcionarios")
public class Registro_funcionarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_registro")
    private Integer id_registro;

    @OneToOne
    @JoinColumn(name = "id_funcionario_fk")
    private Funcionarios funcionarios;

    private LocalDate data_admissao;

    private LocalDate data_demissao;

    public Registro_funcionarios() {
    }

    public Registro_funcionarios(Integer id_registro, Funcionarios funcionarios, LocalDate data_admissao, LocalDate data_demissao) {
        this.id_registro = id_registro;
        this.funcionarios = funcionarios;
        this.data_admissao = data_admissao;
        this.data_demissao = data_demissao;
    }

    public Integer getId_registro() {
        return id_registro;
    }

    public void setId_registro(Integer id_registro) {
        this.id_registro = id_registro;
    }

    public Funcionarios getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(Funcionarios funcionarios) {
        this.funcionarios = funcionarios;
    }

    public LocalDate getData_admissao() {
        return data_admissao;
    }

    public void setData_admissao(LocalDate data_admissao) {
        this.data_admissao = data_admissao;
    }

    public LocalDate getData_demissao() {
        return data_demissao;
    }

    public void setData_demissao(LocalDate data_demissao) {
        this.data_demissao = data_demissao;
    }

}

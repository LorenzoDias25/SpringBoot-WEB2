package com.example.Escola_WEB2.DTO;

import java.time.LocalDate;

public class RegistroUpdate {

    private Integer id_funcionario;
    private LocalDate data_admissao;
    private LocalDate data_demissao;
    private boolean demitido;

    public RegistroUpdate() {
    }

    public RegistroUpdate(Integer id_funcionario, LocalDate data_admissao, LocalDate data_demissao, Boolean demitido) {
        this.id_funcionario = id_funcionario;
        this.data_admissao = data_admissao;
        this.data_demissao = data_demissao;
        this.demitido = demitido;
    }

    public boolean isDemitido() {
        return demitido;
    }

    public void setDemitido(boolean demitido) {
        this.demitido = demitido;
    }

    public Integer getId_funcionario() {
        return id_funcionario;
    }

    public void setId_funcionario(Integer id_funcionario) {
        this.id_funcionario = id_funcionario;
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

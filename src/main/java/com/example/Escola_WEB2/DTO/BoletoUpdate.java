package com.example.Escola_WEB2.DTO;

import java.time.LocalDate;

public class BoletoUpdate {

    private Double valor;
    private LocalDate data_emissao;
    private LocalDate data_vencimento;
    private Integer id_aluno_fk;
    private String status;

    public BoletoUpdate() {
    }

    public BoletoUpdate(Double valor, LocalDate data_emissao, LocalDate data_vencimento, Integer id_aluno_fk, String status) {
        this.valor = valor;
        this.data_emissao = data_emissao;
        this.data_vencimento = data_vencimento;
        this.id_aluno_fk = id_aluno_fk;
        this.status = status;
    }

    public Integer getId_aluno_fk() {
        return id_aluno_fk;
    }

    public void setId_aluno_fk(Integer id_aluno_fk) {
        this.id_aluno_fk = id_aluno_fk;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public LocalDate getData_emissao() {
        return data_emissao;
    }

    public void setData_emissao(LocalDate data_emissao) {
        this.data_emissao = data_emissao;
    }

    public LocalDate getData_vencimento() {
        return data_vencimento;
    }

    public void setData_vencimento(LocalDate data_vencimento) {
        this.data_vencimento = data_vencimento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}

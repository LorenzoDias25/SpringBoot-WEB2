package com.example.Escola_WEB2.Model;

import com.example.Escola_WEB2.Enums.Status_boleto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "boleto")
public class Boleto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_boleto")
    private Integer id_boleto;

    @ManyToOne
    @JoinColumn(name = "id_aluno_fk")
    private Alunos alunos;

    private Double valor;

    private LocalDate dataEmissao;

    private LocalDate dataVencimento;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status_boleto status;

    public Boleto() {
    }

    public Boleto(Integer id_boleto, Alunos alunos, Double valor, LocalDate dataEmissao, LocalDate dataVencimento, Status_boleto status) {
        this.id_boleto = id_boleto;
        this.alunos = alunos;
        this.valor = valor;
        this.dataEmissao = dataEmissao;
        this.dataVencimento = dataVencimento;
        this.status = status;
    }

    public Integer getId_boleto() {
        return id_boleto;
    }

    public void setId_boleto(Integer id_boleto) {
        this.id_boleto = id_boleto;
    }

    public Alunos getAlunos() {
        return alunos;
    }

    public void setAlunos(Alunos alunos) {
        this.alunos = alunos;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public LocalDate getDataEmissao() {
        return dataEmissao;
    }

    public void setDataEmissao(LocalDate dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public Status_boleto getStatus() {
        return status;
    }

    public void setStatus(Status_boleto status) {
        this.status = status;
    }

}

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

    private LocalDate data_emissao;

    private LocalDate data_vencimento;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status_boleto status;

    public Boleto() {
    }

    public Boleto(Integer id_boleto, Alunos alunos, Double valor, LocalDate data_emissao, LocalDate data_vencimento, Status_boleto status) {
        this.id_boleto = id_boleto;
        this.alunos = alunos;
        this.valor = valor;
        this.data_emissao = data_emissao;
        this.data_vencimento = data_vencimento;
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

    public Status_boleto getStatus() {
        return status;
    }

    public void setStatus(Status_boleto status) {
        this.status = status;
    }

}

package com.example.Escola_WEB2.DTO;

import java.time.LocalDate;

public class EventosUpdate {

    private String nome;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String participantes;
    private String caminho;

    private int id_tipo;

    public EventosUpdate() {
    }

    public EventosUpdate(String nome, LocalDate dataInicio, LocalDate dataFim, String participantes, String caminho, int id_tipo) {
        this.nome = nome;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.participantes = participantes;
        this.caminho = caminho;
        this.id_tipo = id_tipo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public String getParticipantes() {
        return participantes;
    }

    public void setParticipantes(String participantes) {
        this.participantes = participantes;
    }

    public String getCaminho() {
        return caminho;
    }

    public void setCaminho(String caminho) {
        this.caminho = caminho;
    }

    public int getId_tipo() {
        return id_tipo;
    }

    public void setId_tipo(int id_tipo) {
        this.id_tipo = id_tipo;
    }

}

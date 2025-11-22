package com.example.Escola_WEB2.DTO;


public class TipoEventoUpdate {

    private String nome;
    
    private int id_local;

    public TipoEventoUpdate() {
    }

    public TipoEventoUpdate(String nome, int id_local) {
        this.nome = nome;
        this.id_local = id_local;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getId_local() {
        return id_local;
    }

    public void setId_local(int id_local) {
        this.id_local = id_local;
    }
    
    
}

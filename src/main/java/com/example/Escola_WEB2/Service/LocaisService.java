package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.LocaisUpdate;
import com.example.Escola_WEB2.Model.Locais;
import com.example.Escola_WEB2.Repository.LocaisRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LocaisService {

    private final LocaisRepository repository;

    @Transactional
    public void atualizarLocal(Integer id, LocaisUpdate dto) {

        Locais local = repository.findById(id).orElseThrow(() -> new RuntimeException("Local nao encontrado"));

        local.setNome(dto.getNome());

        repository.save(local);
    }

    @Transactional
    public void inserirLocal(LocaisUpdate dto) {
        Locais local = new Locais();

        local.setNome(dto.getNome());

        repository.save(local);
    }

    public LocaisService(LocaisRepository repository) {
        this.repository = repository;
    }
}

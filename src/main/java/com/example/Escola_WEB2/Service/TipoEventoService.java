package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.TipoEventoUpdate;
import com.example.Escola_WEB2.Model.Locais;
import com.example.Escola_WEB2.Model.TipoEvento;
import com.example.Escola_WEB2.Repository.LocaisRepository;
import com.example.Escola_WEB2.Repository.Tipo_eventoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TipoEventoService {

    private final Tipo_eventoRepository tipoRepository;
    private final LocaisRepository locaisRepository;

    @Transactional
    public void atualizarTipoEvento(Integer id, TipoEventoUpdate dto) {

        TipoEvento tipoEvento = tipoRepository.findById(id).orElseThrow(() -> new RuntimeException("Tipo de evento nao encontrado"));

        Locais local = locaisRepository.findById(dto.getId_local()).orElseThrow(() -> new RuntimeException("Local nao encotrando"));

        tipoEvento.setLocais(local);

        tipoEvento.setNome(dto.getNome());

        tipoRepository.save(tipoEvento);
    }

    @Transactional
    public void inserirTipoEvento(TipoEventoUpdate dto) {
        TipoEvento tipoEvento = new TipoEvento();

        Locais local = locaisRepository.findById(dto.getId_local()).orElseThrow(() -> new RuntimeException("Local nao encotrando"));

        tipoEvento.setLocais(local);

        tipoEvento.setNome(dto.getNome());

        tipoRepository.save(tipoEvento);
    }

    public TipoEventoService(Tipo_eventoRepository tipoRepository, LocaisRepository locaisRepository) {
        this.tipoRepository = tipoRepository;
        this.locaisRepository = locaisRepository;
    }
}

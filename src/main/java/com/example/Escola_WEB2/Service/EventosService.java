package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.EventosUpdate;
import com.example.Escola_WEB2.Model.Eventos;
import com.example.Escola_WEB2.Model.TipoEvento;
import com.example.Escola_WEB2.Repository.EventosRepository;
import com.example.Escola_WEB2.Repository.LocaisRepository;
import com.example.Escola_WEB2.Repository.Tipo_eventoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventosService {

    private final EventosRepository eventosRepository;
    private final Tipo_eventoRepository tipoRepository;
    private final LocaisRepository locaisRepository;

    @Transactional
    public void atualizarEvento(Integer id, EventosUpdate dto) {

        Eventos evento = eventosRepository.findById(id).orElseThrow(() -> new RuntimeException("Evento nao encontrado"));

        TipoEvento tipoEvento = tipoRepository.findById(dto.getId_tipo()).orElseThrow(() -> new RuntimeException("Tipo de evento  nao encontrado"));

        evento.setNome(dto.getNome());
        evento.setDataInicio(dto.getDataInicio());
        evento.setDataFim(dto.getDataFim());
        evento.setParticipantes(dto.getParticipantes());
        evento.setCaminho(dto.getCaminho());

        evento.setTipoEvento(tipoEvento);

        eventosRepository.save(evento);
    }

    @Transactional
    public void inserirEvento(EventosUpdate dto) {
        Eventos evento = new Eventos();
        
        TipoEvento tipoEvento = tipoRepository.findById(dto.getId_tipo()).orElseThrow(() -> new RuntimeException("Tipo de evento  nao encontrado"));

        evento.setNome(dto.getNome());
        evento.setDataInicio(dto.getDataInicio());
        evento.setDataFim(dto.getDataFim());
        evento.setParticipantes(dto.getParticipantes());
        evento.setCaminho(dto.getCaminho());

        evento.setTipoEvento(tipoEvento);

        eventosRepository.save(evento);
    }

    public EventosService(EventosRepository eventosRepository, Tipo_eventoRepository tipoRepository, LocaisRepository locaisRepository) {
        this.eventosRepository = eventosRepository;
        this.tipoRepository = tipoRepository;
        this.locaisRepository = locaisRepository;
    }

}

package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.TipoEventoUpdate;
import com.example.Escola_WEB2.Model.TipoEvento;
import com.example.Escola_WEB2.Repository.Tipo_eventoRepository;
import com.example.Escola_WEB2.Service.TipoEventoService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tipo-evento")
public class Tipo_eventosRestController {

    private final Tipo_eventoRepository repository;
    private final TipoEventoService service;

    @GetMapping("/todos")
    public List<TipoEvento> getAllTipoEvento() {
        return repository.findAllByOrderByNomeAsc();
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> updateTipoEvento(
            @PathVariable Integer id,
            @RequestBody TipoEventoUpdate dto) {

        // Chama o serviço para fazer a atualização
        service.atualizarTipoEvento(id, dto);

        return ResponseEntity.ok().build(); // Retorna "200 OK"
    }

    @GetMapping("/procurar/{nome}")
    public List<TipoEvento> procurarTipoEvento(@PathVariable String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> inserirTipoEvento(@RequestBody TipoEventoUpdate dto) { // Reusa o DTO!
        service.inserirTipoEvento(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Retorna 201 Created
    }

    public Tipo_eventosRestController(Tipo_eventoRepository repository, TipoEventoService service) {
        this.repository = repository;
        this.service = service;
    }
}

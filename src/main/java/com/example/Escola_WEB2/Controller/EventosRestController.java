package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.EventosUpdate;
import com.example.Escola_WEB2.Model.Eventos;
import com.example.Escola_WEB2.Repository.EventosRepository;
import com.example.Escola_WEB2.Service.EventosService;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/eventos")
public class EventosRestController {

    private final EventosRepository eventosRepository;
    private final EventosService eventosService;

    @GetMapping("/todos")
    public List<Eventos> getAllEventos() {
        return eventosRepository.findAllByOrderByNomeAsc();
    }

    @GetMapping("/pesquisar")
    public List<Eventos> pesquisarEventos(
            @RequestParam(value = "termo", defaultValue = "") String termo,
            @RequestParam(value = "tipo", defaultValue = "nome") String tipo,
            @RequestParam(value = "ordem", defaultValue = "az") String ordem) {

        // 1. Define a direção da ordenação (baseado no "Ordenar por:")
        Sort sort = ordem.equals("za")
                ? Sort.by("nome").descending()
                : Sort.by("nome").ascending();

        // 2. Decide qual método de busca usar (baseado no "Pesquisar por:")
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dataConvertida = null;
        switch (tipo) {
            case "tipo":
                return eventosRepository.findByTipoEventoNomeContainingIgnoreCase(termo, sort);
            case "local":
                return eventosRepository.findByTipoEventoLocaisNomeContainingIgnoreCase(termo, sort);
            case "inicio":
                dataConvertida = LocalDate.parse(termo, formatter);

                return eventosRepository.findByDataInicio(dataConvertida, sort);
            case "fim":
                dataConvertida = LocalDate.parse(termo, formatter);

                return eventosRepository.findByDataFim(dataConvertida, sort);
            default:
                return eventosRepository.findByNomeContainingIgnoreCase(termo, sort);

        }
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> updateEvento(
            @PathVariable Integer id,
            @RequestBody EventosUpdate dto) {

        // Chama o serviço para fazer a atualização
        eventosService.atualizarEvento(id, dto);

        return ResponseEntity.ok().build(); // Retorna "200 OK"
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> criarEvento(@RequestBody EventosUpdate dto) { // Reusa o DTO!
        eventosService.inserirEvento(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Retorna 201 Created
    }

    public EventosRestController(EventosRepository eventosRepository, EventosService eventosService) {
        this.eventosRepository = eventosRepository;
        this.eventosService = eventosService;
    }

}

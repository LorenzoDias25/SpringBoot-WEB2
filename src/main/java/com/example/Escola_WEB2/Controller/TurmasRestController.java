package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.TurmasUpdate;
import com.example.Escola_WEB2.Model.Turmas;
import com.example.Escola_WEB2.Repository.TurmasRepository;
import com.example.Escola_WEB2.Service.TurmasService;
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
@RequestMapping("/api/turmas")
public class TurmasRestController {

    private final TurmasRepository repository;
    private final TurmasService service;

    @GetMapping("/todos")
    public List<Turmas> getAllTurmas() {
        return repository.findAllByOrderByCodigoAsc();
    }

    @GetMapping("/pesquisar")
    public List<Turmas> pesquisarTurmas(
            @RequestParam(value = "termo", defaultValue = "") String termo,
            @RequestParam(value = "tipo", defaultValue = "nome") String tipo,
            @RequestParam(value = "ordem", defaultValue = "az") String ordem) {

        // 1. Define a direção da ordenação (baseado no "Ordenar por:")
        Sort sort = ordem.equals("za")
                ? Sort.by("nome").descending()
                : Sort.by("nome").ascending();

        // 2. Decide qual método de busca usar (baseado no "Pesquisar por:")
        switch (tipo) {
            case "codigo":
                return repository.findByCodigoContainingIgnoreCase(termo, sort);
            case "turno":
                return repository.findByTurnoContainingIgnoreCase(termo, sort);
            default:
                return repository.findByNomeContainingIgnoreCase(termo, sort);
        }
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> atualizarTurma(
            @PathVariable Integer id,
            @RequestBody TurmasUpdate dto) {

        // Chama o serviço para fazer a atualização
        service.atualizarTurma(id, dto);

        return ResponseEntity.ok().build(); // Retorna "200 OK"
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> inserirTurma(@RequestBody TurmasUpdate dto) { // Reusa o DTO!
        service.inserirTurma(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Retorna 201 Created
    }

    public TurmasRestController(TurmasRepository repository, TurmasService service) {
        this.repository = repository;
        this.service = service;
    }
}

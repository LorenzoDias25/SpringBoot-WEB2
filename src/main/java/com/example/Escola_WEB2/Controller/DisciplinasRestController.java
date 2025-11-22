package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.DisciplinasUpdate;
import com.example.Escola_WEB2.Model.Disciplinas;
import com.example.Escola_WEB2.Repository.DisciplinasRepository;
import com.example.Escola_WEB2.Service.DisciplinasService;
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
@RequestMapping("/api/disciplinas")
public class DisciplinasRestController {

    private final DisciplinasRepository repository;
    private final DisciplinasService service;
    
    @GetMapping("/todos")
    public List<Disciplinas> getAllDisciplinas() {
        return repository.findAllByOrderByCodigoAsc();
    }

    @GetMapping("/pesquisar")
    public List<Disciplinas> pesquisarDisciplinas(
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
            default:
                return repository.findByNomeContainingIgnoreCase(termo, sort);
        }
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> atualizarDisciplina(
            @PathVariable Integer id,
            @RequestBody DisciplinasUpdate dto) {

        // Chama o serviço para fazer a atualização
        service.atualizarDisciplina(id, dto);

        return ResponseEntity.ok().build(); // Retorna "200 OK"
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> inserirDisciplina(@RequestBody DisciplinasUpdate dto) { // Reusa o DTO!
        service.inserirDisciplina(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Retorna 201 Created
    }

    public DisciplinasRestController(DisciplinasRepository repository, DisciplinasService service) {
        this.repository = repository;
        this.service = service;
    }
}

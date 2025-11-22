package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.LocaisUpdate;
import com.example.Escola_WEB2.Model.Locais;
import com.example.Escola_WEB2.Repository.LocaisRepository;
import com.example.Escola_WEB2.Service.LocaisService;
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
@RequestMapping("/api/locais")
public class LocaisRestController {

    private final LocaisRepository repository;
    private final LocaisService service;

    @GetMapping("/todos")
    public List<Locais> getAllLocais() {
        return repository.findAllByOrderByNomeAsc();
    }

    @GetMapping("/procurar/{nome}")
    public List<Locais> procurarLocal(@PathVariable String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> updateLocal(
            @PathVariable Integer id,
            @RequestBody LocaisUpdate dto) {

        // Chama o serviço para fazer a atualização
        service.atualizarLocal(id, dto);

        return ResponseEntity.ok().build(); // Retorna "200 OK"
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> inserirLocal(@RequestBody LocaisUpdate dto) { // Reusa o DTO!
        service.inserirLocal(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Retorna 201 Created
    }

    public LocaisRestController(LocaisRepository repository, LocaisService service) {
        this.repository = repository;
        this.service = service;
    }
}

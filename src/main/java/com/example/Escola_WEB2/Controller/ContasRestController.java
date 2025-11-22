package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.ContasUpdate;
import com.example.Escola_WEB2.Enums.Tipo_usuario;
import com.example.Escola_WEB2.Model.Contas;
import com.example.Escola_WEB2.Repository.ContasRepository;
import com.example.Escola_WEB2.Service.ContasService;
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
@RequestMapping("/api/contas")
public class ContasRestController {

    private final ContasRepository repository;
    private final ContasService service;

    @GetMapping("/todos")
    public List<Contas> getAllContas() {
        return repository.findAllByOrderByCodigoAsc();
    }

    @GetMapping("/pesquisar")
    public List<Contas> pesquisarContas(
            @RequestParam(value = "termo", defaultValue = "") String termo,
            @RequestParam(value = "tipo", defaultValue = "email") String tipo,
            @RequestParam(value = "ordem", defaultValue = "az") String ordem) {

        // 1. Define a direção da ordenação (baseado no "Ordenar por:")
        Sort sort = ordem.equals("za")
                ? Sort.by("email").descending()
                : Sort.by("email").ascending();

        // 2. Decide qual método de busca usar (baseado no "Pesquisar por:")
        switch (tipo) {
            case "email":
                return repository.findByEmailContainingIgnoreCase(termo, sort);
            case "conta":

                return repository.findByTipoUsuario(Tipo_usuario.valueOf(termo));
            case "status":
                return repository.findByAtivo(Boolean.parseBoolean(termo));
            default:
                return repository.findByCodigoContainingIgnoreCase(termo, sort);
        }
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> atualizarConta(@PathVariable Integer id, @RequestBody ContasUpdate dto) {
        service.atualizarConta(id, dto);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> inserirConta(@RequestBody ContasUpdate dto) {

        service.inserirConta(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public ContasRestController(ContasRepository repository, ContasService service) {
        this.repository = repository;
        this.service = service;
    }
}

package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.FuncionariosUpdate;
import com.example.Escola_WEB2.Model.Funcionarios;
import com.example.Escola_WEB2.Repository.FuncionariosRepository;
import com.example.Escola_WEB2.Service.FuncionariosService;
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
@RequestMapping("/api/funcionarios")
public class FuncionariosRestController {

    private final FuncionariosRepository repository;
    private final FuncionariosService service;

    @GetMapping("/todos")
    public List<Funcionarios> getAllFuncionarios() {
        return repository.findAllByOrderByNomeAsc();
    }

    @GetMapping("/por-cargo/{cargo}")
    public List<Funcionarios> getAllPorCargo(@PathVariable String cargo) {
        return repository.findByCargoNomeContainingIgnoreCase(cargo);
    }

    @GetMapping("/por-codigo/{codigo}")
    public Funcionarios getByCodigo(@PathVariable String codigo) {
        return repository.findByCodigo(codigo);
    }

    @GetMapping("/pesquisar")
    public List<Funcionarios> pesquisarFuncionarios(
            @RequestParam(value = "termo", defaultValue = "") String termo,
            @RequestParam(value = "tipo", defaultValue = "nome") String tipo,
            @RequestParam(value = "ordem", defaultValue = "az") String ordem) {

        // 1. Define a direção da ordenação (baseado no "Ordenar por:")
        Sort sort = ordem.equals("za")
                ? Sort.by("nome").descending()
                : Sort.by("nome").ascending();

        // 2. Decide qual método de busca usar (baseado no "Pesquisar por:")
        switch (tipo) {
            case "email":
                return repository.findByEmailContainingIgnoreCase(termo, sort);
            case "codigo":
                return repository.findByCodigoContainingIgnoreCase(termo, sort);
            case "cargo":
                return repository.findByCargoNomeContainingIgnoreCase(termo, sort);
            default:
                return repository.findByNomeContainingIgnoreCase(termo, sort);
        }
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> atualizarFuncionario(@PathVariable Integer id, @RequestBody FuncionariosUpdate dto) {
        service.atualizarFuncionario(id, dto);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> inserirFuncionario(@RequestBody FuncionariosUpdate dto) {

        service.inserirFuncionario(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public FuncionariosRestController(FuncionariosRepository repository, FuncionariosService service) {
        this.repository = repository;
        this.service = service;
    }
}

package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.Model.Funcionarios;
import com.example.Escola_WEB2.Repository.FuncionariosRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionariosRestController {

    private final FuncionariosRepository repository;

    @GetMapping("/por-cargo/{cargo}")
    public List<Funcionarios> getAllPorCargo(@PathVariable String cargo) {
        return repository.findByCargoNomeContainingIgnoreCase(cargo);
    }

    @GetMapping("/por-codigo/{codigo}")
    public Funcionarios getByCodigo(@PathVariable String codigo) {
        return repository.findByCodigo(codigo);
    }

    public FuncionariosRestController(FuncionariosRepository repository) {
        this.repository = repository;
    }
}

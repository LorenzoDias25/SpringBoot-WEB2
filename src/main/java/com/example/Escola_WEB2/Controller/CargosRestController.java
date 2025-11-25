package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.Model.Grade_cargos;
import com.example.Escola_WEB2.Repository.Grade_cargosRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cargos")
public class CargosRestController {

    private final Grade_cargosRepository repository;

    @GetMapping("/por-id/{id}")
    public Grade_cargos getPorId(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/por-nome/{nome}")
    public Grade_cargos getPorNome(@PathVariable String nome) {
        return repository.findByNomeContainingIgnoreCase(nome).orElse(null);
    }

    public CargosRestController(Grade_cargosRepository repository) {
        this.repository = repository;
    }
}

package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.Model.Registro_funcionarios;
import com.example.Escola_WEB2.Repository.Registro_funcionariosRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/registro")
public class RegistroRestController {

    private final Registro_funcionariosRepository repository;

    @GetMapping("/por-funcionario/{id}")
    public Registro_funcionarios getPorId(@PathVariable Integer id) {
        return repository.findByFuncionariosId(id).orElse(null);
    }

    public RegistroRestController(Registro_funcionariosRepository repository) {
        this.repository = repository;
    }
}

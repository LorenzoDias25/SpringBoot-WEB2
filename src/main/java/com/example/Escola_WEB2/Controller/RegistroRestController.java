package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.RegistroUpdate;
import com.example.Escola_WEB2.Model.Registro_funcionarios;
import com.example.Escola_WEB2.Repository.Registro_funcionariosRepository;
import com.example.Escola_WEB2.Service.RegistroService;
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
@RequestMapping("/api/registro")
public class RegistroRestController {

    private final Registro_funcionariosRepository repository;
    private final RegistroService service;

    @GetMapping("/por-funcionario/{id}")
    public Registro_funcionarios getPorId(@PathVariable Integer id) {
        return repository.findByFuncionariosId(id).orElse(null);
    }

    @PutMapping("/salvar")
    public ResponseEntity<Void> atualizarRegistro(@RequestBody RegistroUpdate dto) {
        service.atualizarRegistro(dto);

        return ResponseEntity.ok().build();
    }

    public RegistroRestController(Registro_funcionariosRepository repository, RegistroService service) {
        this.repository = repository;
        this.service = service;
    }
}

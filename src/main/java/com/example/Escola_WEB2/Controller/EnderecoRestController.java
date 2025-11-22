package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.EnderecoUpdate;
import com.example.Escola_WEB2.Model.Endereco;
import com.example.Escola_WEB2.Repository.EnderecoRepository;
import com.example.Escola_WEB2.Service.EnderecoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/endereco")
public class EnderecoRestController {

    private final EnderecoRepository repository;
    private final EnderecoService service;

    @GetMapping("/por-id/{id}")
    public Endereco getPorId(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> atualizarEndereco(
            @PathVariable Integer id,
            @RequestBody EnderecoUpdate dto) {

        // Chama o serviço para fazer a atualização
        service.atualizarEndereco(id, dto);

        return ResponseEntity.ok().build(); // Retorna "200 OK"
    }

    public EnderecoRestController(EnderecoRepository repository, EnderecoService service) {
        this.repository = repository;
        this.service = service;
    }
}

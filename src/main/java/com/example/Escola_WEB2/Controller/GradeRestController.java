package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.GradeDisciplinaUpdate;
import com.example.Escola_WEB2.Model.Grade_disciplinas;
import com.example.Escola_WEB2.Repository.Grade_disciplinasRepository;
import com.example.Escola_WEB2.Service.GradeDisciplinaService;
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
@RequestMapping("/api/grade")
public class GradeRestController {

    private final Grade_disciplinasRepository repository;
    private final GradeDisciplinaService service;

    @GetMapping("/por-disciplina/{codigo}")
    public List<Grade_disciplinas> getPorDisciplina(@PathVariable String codigo) {
        return repository.findByDisciplinasCodigo(codigo);
    }

    @GetMapping("/por-turma/{codigo}")
    public List<Grade_disciplinas> getPorTurma(@PathVariable String codigo) {
        return repository.findByTurmasCodigo(codigo);
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> atualizarGrade(
            @PathVariable Integer id,
            @RequestBody GradeDisciplinaUpdate dto) {

        // Chama o serviço para fazer a atualização
        service.atualizarGrade(id, dto);

        return ResponseEntity.ok().build(); // Retorna "200 OK"
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> inserirGrade(@RequestBody GradeDisciplinaUpdate dto) { // Reusa o DTO!
        service.inserirGrade(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Retorna 201 Created
    }

    public GradeRestController(Grade_disciplinasRepository repository, GradeDisciplinaService service) {
        this.repository = repository;
        this.service = service;
    }
}

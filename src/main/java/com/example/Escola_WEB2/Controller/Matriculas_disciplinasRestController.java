package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.MatriculasUpdate;
import com.example.Escola_WEB2.Enums.Status_disciplina;
import com.example.Escola_WEB2.Model.Matriculas_disciplinas;
import com.example.Escola_WEB2.Repository.Matriculas_disciplinasRepository;
import com.example.Escola_WEB2.Service.MatriculasService;
import java.util.List;
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
@RequestMapping("/api/matriculas")
public class Matriculas_disciplinasRestController {

    private final Matriculas_disciplinasRepository matriculas_disciplinasRepository;
    private final MatriculasService service;

    @GetMapping("/todos")
    public List<Matriculas_disciplinas> getAllMatriculas_disciplinas() {
        return matriculas_disciplinasRepository.findAll();
    }

    @GetMapping("/por-aluno/{alunosId}")
    public List<Matriculas_disciplinas> getPorAluno(@PathVariable Integer alunosId) {
        return matriculas_disciplinasRepository.findByAlunosId(alunosId);
    }

    @GetMapping("/por-matricula-aluno/{matricula}")
    public List<Matriculas_disciplinas> getPorAlunoMatricula(@PathVariable String matricula) {
        return matriculas_disciplinasRepository.findByAlunosMatricula(matricula);
    }

    @GetMapping("/por-disciplina/{codigo}")
    public List<Matriculas_disciplinas> getPorDisciplina(@PathVariable String codigo) {
        return matriculas_disciplinasRepository.findByDisciplinaCodigo(codigo);
    }

    @GetMapping("/por-turma/{codigo}")
    public List<Matriculas_disciplinas> getPorTurma(@PathVariable String codigo) {
        return matriculas_disciplinasRepository.findByGradeDisciplinasTurmasCodigo(codigo);
    }

    @GetMapping("/pesquisar")
    public List<Matriculas_disciplinas> pesquisarBoletos(
            @RequestParam(value = "termo", defaultValue = "") String termo,
            @RequestParam(value = "tipo", defaultValue = "") String tipo,
            @RequestParam(value = "matricula", defaultValue = "") String matricula) {

        // 2. Decide qual método de busca usar (baseado no "Pesquisar por:")
        switch (tipo) {
            case "turma":
                return matriculas_disciplinasRepository.findByGradeDisciplinasTurmasCodigoContainingIgnoreCaseAndAlunosMatricula(termo, matricula);
            case "semestre":
                return matriculas_disciplinasRepository.findByGradeDisciplinasTurmasSemestreAndAlunosMatricula(Double.parseDouble(termo), matricula);
            case "disciplina":
                return matriculas_disciplinasRepository.findByGradeDisciplinasDisciplinasNomeContainingIgnoreCaseAndAlunosMatricula(termo, matricula);
            case "nota":
                return matriculas_disciplinasRepository.findByNotaFinalAndAlunosMatricula(Integer.parseInt(termo), matricula);
            default:
                return matriculas_disciplinasRepository.findByStatusDisciplinaAndAlunosMatricula(Status_disciplina.valueOf(termo), matricula);
        }
    }

    @PutMapping("/salvar")
    public ResponseEntity<Void> AtualizarMatriculaDisciplinas(@RequestBody MatriculasUpdate dto) {
        service.atualizarNotaEStatus(dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> atualizarMatricula(
            @PathVariable Integer id,
            @RequestBody MatriculasUpdate dto) {

        // Chama o serviço para fazer a atualização
        service.atualizarMatricula(id, dto);

        return ResponseEntity.ok().build(); // Retorna "200 OK"
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> inserirMatricula(@RequestBody MatriculasUpdate dto) { // Reusa o DTO!
        service.inserirMatricula(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Retorna 201 Created
    }

    public Matriculas_disciplinasRestController(Matriculas_disciplinasRepository matriculas_disciplinasRepository, MatriculasService service) {
        this.matriculas_disciplinasRepository = matriculas_disciplinasRepository;
        this.service = service;
    }

}

package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.AlunosUpdate;
import com.example.Escola_WEB2.Model.Alunos;
import com.example.Escola_WEB2.Repository.AlunosRepository;
import com.example.Escola_WEB2.Service.AlunosService;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/alunos")
public class AlunosRestController {

    private final AlunosRepository alunosRepository;

    private final AlunosService alunosService;

    @GetMapping("/todos")
    public List<Alunos> getAllAlunos(Model model) {
        return alunosRepository.findAllByOrderByNomeAsc();
    }

    @GetMapping("/pesquisar")
    public List<Alunos> pesquisarAlunos(
            @RequestParam(value = "termo", defaultValue = "") String termo,
            @RequestParam(value = "tipo", defaultValue = "nome") String tipo,
            @RequestParam(value = "ordem", defaultValue = "az") String ordem) {

        // 1. Define a direção da ordenação (baseado no "Ordenar por:")
        Sort sort = ordem.equals("za")
                ? Sort.by("nome").descending()
                : Sort.by("nome").ascending();

        // 2. Decide qual método de busca usar (baseado no "Pesquisar por:")
        switch (tipo) {
            case "matricula":
                return alunosRepository.findByMatriculaContainingIgnoreCase(termo, sort);
            case "nome":
            default:
                return alunosRepository.findByNomeContainingIgnoreCase(termo, sort);
        }
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> updateAluno(
            @PathVariable Integer id,
            @RequestBody AlunosUpdate dto) {

        // Chama o serviço para fazer a atualização
        alunosService.atualizarAluno(id, dto);

        return ResponseEntity.ok().build(); // Retorna "200 OK"
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> criarAluno(@RequestBody AlunosUpdate dto) { // Reusa o DTO!
        alunosService.criarAluno(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Retorna 201 Created
    }

    public AlunosRestController(AlunosRepository alunosRepository, AlunosService alunosService) {
        this.alunosRepository = alunosRepository;
        this.alunosService = alunosService;
    }

}

package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.DisciplinasUpdate;
import com.example.Escola_WEB2.Model.Disciplinas;
import com.example.Escola_WEB2.Repository.DisciplinasRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DisciplinasService {

    private final DisciplinasRepository repository;

    @Transactional
    public void atualizarDisciplina(Integer id, DisciplinasUpdate dto) {
        Disciplinas disciplina = repository.findById(id).orElseThrow(() -> new RuntimeException("Disciplina nao encontrada"));

        disciplina.setCodigo(dto.getCodigo());
        disciplina.setNome(dto.getNome());
        disciplina.setCarga_horaria(dto.getCarga_horaria());
        disciplina.setValor(dto.getValor());

        repository.save(disciplina);
    }

    @Transactional
    public void inserirDisciplina(DisciplinasUpdate dto) {
        Disciplinas disciplina = new Disciplinas();

        disciplina.setCodigo(dto.getCodigo());
        disciplina.setNome(dto.getNome());
        disciplina.setCarga_horaria(dto.getCarga_horaria());
        disciplina.setValor(dto.getValor());

        repository.save(disciplina);
    }

    public DisciplinasService(DisciplinasRepository repository) {
        this.repository = repository;
    }
}

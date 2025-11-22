package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.TurmasUpdate;
import com.example.Escola_WEB2.Model.Turmas;
import com.example.Escola_WEB2.Repository.TurmasRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TurmasService {

    private final TurmasRepository repository;

    @Transactional
    public void atualizarTurma(Integer id, TurmasUpdate dto) {

        Turmas turma = repository.findById(id).orElseThrow(() -> new RuntimeException("Turma nao encontrada"));

        turma.setCodigo(dto.getCodigo());
        turma.setNome(dto.getNome());
        turma.setTurno(dto.getTurno());
        turma.setSemestre(dto.getSemestre());

        repository.save(turma);
    }

    @Transactional
    public void inserirTurma(TurmasUpdate dto) {
        Turmas turma = new Turmas();

        turma.setCodigo(dto.getCodigo());
        turma.setNome(dto.getNome());
        turma.setTurno(dto.getTurno());
        turma.setSemestre(dto.getSemestre());

        repository.save(turma);
    }

    public TurmasService(TurmasRepository repository) {
        this.repository = repository;
    }
}

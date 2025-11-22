package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.GradeDisciplinaUpdate;
import com.example.Escola_WEB2.Model.Disciplinas;
import com.example.Escola_WEB2.Model.Funcionarios;
import com.example.Escola_WEB2.Model.Grade_disciplinas;
import com.example.Escola_WEB2.Model.Turmas;
import com.example.Escola_WEB2.Repository.DisciplinasRepository;
import com.example.Escola_WEB2.Repository.FuncionariosRepository;
import com.example.Escola_WEB2.Repository.Grade_disciplinasRepository;
import com.example.Escola_WEB2.Repository.TurmasRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GradeDisciplinaService {

    private final Grade_disciplinasRepository repository;
    private final TurmasRepository turmasRepository;
    private final DisciplinasRepository disciplinasRepository;
    private final FuncionariosRepository funcionariosRepository;

    @Transactional
    public void atualizarGrade(Integer id, GradeDisciplinaUpdate dto) {

        Grade_disciplinas grade = repository.findById(id).orElseThrow(() -> new RuntimeException("Grade nao encontrada"));

        Turmas turma = turmasRepository.findById(dto.getId_turma()).orElseThrow(() -> new RuntimeException("Turma nao encontrada"));

        Disciplinas disciplina = disciplinasRepository.findById(dto.getId_disciplina()).orElseThrow(() -> new RuntimeException("Disciplina nao encontrada"));

        Funcionarios funcionario = funcionariosRepository.findById(dto.getId_funcionario()).orElseThrow(() -> new RuntimeException("Funcionario nao encontrado"));

        grade.setTurmas(turma);
        grade.setDisciplinas(disciplina);
        grade.setFuncionarios(funcionario);
        grade.setHorario(dto.getHorario());

        repository.save(grade);
    }

    @Transactional
    public void inserirGrade(GradeDisciplinaUpdate dto) {

        Grade_disciplinas grade = new Grade_disciplinas();

        Turmas turma = turmasRepository.findById(dto.getId_turma()).orElseThrow(() -> new RuntimeException("Turma nao encontrada"));

        Disciplinas disciplina = disciplinasRepository.findById(dto.getId_disciplina()).orElseThrow(() -> new RuntimeException("Disciplina nao encontrada"));

        Funcionarios funcionario = funcionariosRepository.findById(dto.getId_funcionario()).orElseThrow(() -> new RuntimeException("Funcionario nao encontrado"));

        grade.setTurmas(turma);
        grade.setDisciplinas(disciplina);
        grade.setFuncionarios(funcionario);
        grade.setHorario(dto.getHorario());

        repository.save(grade);
    }

    public GradeDisciplinaService(Grade_disciplinasRepository repository, TurmasRepository turmasRepository, DisciplinasRepository disciplinasRepository, FuncionariosRepository funcionariosRepository) {
        this.repository = repository;
        this.turmasRepository = turmasRepository;
        this.disciplinasRepository = disciplinasRepository;
        this.funcionariosRepository = funcionariosRepository;
    }

}

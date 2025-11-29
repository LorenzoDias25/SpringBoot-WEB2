package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.MatriculasUpdate;
import com.example.Escola_WEB2.Enums.Status_disciplina;
import com.example.Escola_WEB2.Model.Alunos;
import com.example.Escola_WEB2.Model.Grade_disciplinas;
import com.example.Escola_WEB2.Model.Matriculas_disciplinas;
import com.example.Escola_WEB2.Repository.AlunosRepository;
import com.example.Escola_WEB2.Repository.Grade_disciplinasRepository;
import com.example.Escola_WEB2.Repository.Matriculas_disciplinasRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MatriculasService {

    private final Matriculas_disciplinasRepository repository;
    private final AlunosRepository alunosRepository;
    private final Grade_disciplinasRepository gradeRepository;

    @Transactional
    public void atualizarNotaEStatus(MatriculasUpdate dto) {

        Matriculas_disciplinas matriculaExistente = repository.findById(dto.getId_matricula())
                .orElseThrow(() -> new RuntimeException("Matricula nao encontrada"));

        if (dto.getStatus() != null) {
            matriculaExistente.setStatusDisciplina(Status_disciplina.valueOf(dto.getStatus()));
        }

        if (dto.getNota_final() != null) {
            matriculaExistente.setNotaFinal(dto.getNota_final());
        }

        repository.save(matriculaExistente);
    }

    @Transactional
    public void atualizarMatricula(Integer id, MatriculasUpdate dto) {
        Matriculas_disciplinas matricula = repository.findById(id).orElseThrow(() -> new RuntimeException("Matricula nao encontrada"));

//        Alunos aluno = alunosRepository.findById(dto.getId_aluno()).orElseThrow(() -> new RuntimeException("Aluno nao encontrada"));
//
//        Grade_disciplinas grade = gradeRepository.findById(dto.getId_grade()).orElseThrow(() -> new RuntimeException("Grade nao encontrada"));
//
//        matricula.setAlunos(aluno);
//        matricula.setGrade_disciplinas(grade);
//        matricula.setDisciplinaCodigo(dto.getCodigo());
        matricula.setNotaFinal(dto.getNota_final());
        matricula.setStatusDisciplina(Status_disciplina.valueOf(dto.getStatus()));

        repository.save(matricula);
    }

    @Transactional
    public void inserirMatricula(MatriculasUpdate dto) {
        Matriculas_disciplinas matricula = new Matriculas_disciplinas();

        Alunos aluno = alunosRepository.findById(dto.getId_aluno()).orElseThrow(() -> new RuntimeException("Aluno nao encontrada"));

        Grade_disciplinas grade = gradeRepository.findById(dto.getId_grade()).orElseThrow(() -> new RuntimeException("Grade nao encontrada"));

        matricula.setAlunos(aluno);
        matricula.setGradeDisciplinas(grade);
        matricula.setDisciplinaCodigo(dto.getCodigo());
        matricula.setNotaFinal(dto.getNota_final());
        matricula.setStatusDisciplina(Status_disciplina.valueOf(dto.getStatus()));

        repository.save(matricula);

    }

    public MatriculasService(Matriculas_disciplinasRepository repository, AlunosRepository alunosRepository, Grade_disciplinasRepository gradeRepository) {
        this.repository = repository;
        this.alunosRepository = alunosRepository;
        this.gradeRepository = gradeRepository;
    }
}

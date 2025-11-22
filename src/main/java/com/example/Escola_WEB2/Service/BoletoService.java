package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.BoletoUpdate;
import com.example.Escola_WEB2.Enums.Status_boleto;
import com.example.Escola_WEB2.Model.Alunos;
import com.example.Escola_WEB2.Model.Boleto;
import com.example.Escola_WEB2.Repository.AlunosRepository;
import com.example.Escola_WEB2.Repository.BoletoRepository;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoletoService {

    private final BoletoRepository repository;
    private final AlunosRepository alunosRepository;

    @Transactional
    public void atualizarBoleto(Integer id, BoletoUpdate dto) {

        Boleto boletoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Boleto nao encontrado"));

        boletoExistente.setStatus(Status_boleto.valueOf(dto.getStatus()));
        boletoExistente.setValor(dto.getValor());
        boletoExistente.setData_emissao(dto.getData_emissao());
        boletoExistente.setData_vencimento(dto.getData_vencimento());

        repository.save(boletoExistente);
    }

    @Transactional
    public void criarBoleto(BoletoUpdate dto) {
        Alunos aluno = buscarAluno(dto.getId_aluno_fk());

        Boleto boleto = new Boleto();

        boleto.setAlunos(aluno);

        boleto.setData_emissao(dto.getData_emissao());
        boleto.setData_vencimento(dto.getData_vencimento());
        boleto.setValor(dto.getValor());
        boleto.setStatus(Status_boleto.valueOf(dto.getStatus()));

        repository.save(boleto);
    }

    private Alunos buscarAluno(Integer id) {
        // Se o aluno for encontrado, retorne ele.
        // Se NÃO for encontrado, lance uma exceção (runtime)
        Alunos aluno = alunosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com ID: " + id));

        return aluno;
    }

    public BoletoService(BoletoRepository repository, AlunosRepository alunosRepository) {
        this.repository = repository;
        this.alunosRepository = alunosRepository;
    }

}

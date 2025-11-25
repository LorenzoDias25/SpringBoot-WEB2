package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.RegistroUpdate;
import com.example.Escola_WEB2.Model.Registro_funcionarios;
import com.example.Escola_WEB2.Repository.FuncionariosRepository;
import com.example.Escola_WEB2.Repository.Registro_funcionariosRepository;
import java.time.LocalDate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegistroService {

    private final Registro_funcionariosRepository repository;
    private final FuncionariosRepository funcionariosRepository;

    @Transactional
    public void atualizarRegistro(RegistroUpdate dto) {

        Registro_funcionarios registro = repository.findByFuncionariosId(dto.getId_funcionario()).orElseThrow(() -> new RuntimeException("Registro nao encontrado"));

        if (dto.getData_admissao() != null) {
            registro.setData_admissao(dto.getData_admissao());
        }
        if (dto.isDemitido()) {
            registro.setData_demissao(LocalDate.now());
        } else {
            registro.setData_demissao(dto.getData_demissao());
        }

        repository.save(registro);
    }

    public RegistroService(Registro_funcionariosRepository repository, FuncionariosRepository funcionariosRepository) {
        this.repository = repository;
        this.funcionariosRepository = funcionariosRepository;
    }
}

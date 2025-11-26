package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.ContasUpdate;
import com.example.Escola_WEB2.Enums.Tipo_usuario;
import com.example.Escola_WEB2.Model.Contas;
import com.example.Escola_WEB2.Repository.ContasRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContasService {

    private final ContasRepository repository;

    @Transactional
    public void atualizarConta(Integer id, ContasUpdate dto) {

        Contas conta = repository.findById(id).orElseThrow(() -> new RuntimeException("Conta nao encontrada"));
        if (dto.getCodigo() != null) {
            conta.setCodigo(dto.getCodigo());
        }
        if (dto.getEmail() != null) {
            conta.setEmail(dto.getEmail());
        }
        if (dto.getTipo() != null) {
            conta.setTipoUsuario(Tipo_usuario.valueOf(dto.getTipo()));
        }
        if (dto.getSenha() != null) {
            conta.setSenha(new BCryptPasswordEncoder().encode(dto.getSenha()));
        }
        System.out.println("TESTE" + dto.isAtivo());
        conta.setAtivo(dto.isAtivo());

        repository.save(conta);
    }

    @Transactional
    public void inserirConta(ContasUpdate dto) {
        Contas conta = new Contas();

        if (dto.getCodigo() != null) {
            conta.setCodigo(dto.getCodigo());
        }
        if (dto.getEmail() != null) {
            conta.setEmail(dto.getEmail());
        }
        if (dto.getTipo() != null) {
            conta.setTipoUsuario(Tipo_usuario.valueOf(dto.getTipo()));
        }
        if (dto.getSenha() != null) {
            conta.setSenha(new BCryptPasswordEncoder().encode(dto.getSenha()));
        }
        conta.setAtivo(dto.isAtivo());

        repository.save(conta);
    }

    public ContasService(ContasRepository repository) {
        this.repository = repository;
    }
}

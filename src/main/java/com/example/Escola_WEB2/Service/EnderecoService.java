package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.EnderecoUpdate;
import com.example.Escola_WEB2.Model.Endereco;
import com.example.Escola_WEB2.Repository.EnderecoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnderecoService {

    private final EnderecoRepository repository;

    @Transactional
    public void atualizarEndereco(Integer id, EnderecoUpdate dto) {
        Endereco endereco = repository.findById(id).orElseThrow(() -> new RuntimeException("Endereco nao encontrado"));

        endereco.setRua(dto.getRua());
        endereco.setCep(dto.getCep());
        endereco.setNumero(dto.getNumero());
        endereco.setBairro(dto.getBairro());
        endereco.setCidade(dto.getCidade());
        endereco.setComplemento(dto.getComplemento());

        repository.save(endereco);
    }

    public EnderecoService(EnderecoRepository repository) {
        this.repository = repository;
    }
}

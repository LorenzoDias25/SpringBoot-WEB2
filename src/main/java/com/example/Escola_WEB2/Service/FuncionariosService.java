package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.FuncionariosUpdate;
import com.example.Escola_WEB2.Model.Endereco;
import com.example.Escola_WEB2.Model.Funcionarios;
import com.example.Escola_WEB2.Model.Grade_cargos;
import com.example.Escola_WEB2.Model.Registro_funcionarios;
import com.example.Escola_WEB2.Repository.EnderecoRepository;
import com.example.Escola_WEB2.Repository.FuncionariosRepository;
import com.example.Escola_WEB2.Repository.Grade_cargosRepository;
import com.example.Escola_WEB2.Repository.Registro_funcionariosRepository;
import java.time.LocalDate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FuncionariosService {

    private final FuncionariosRepository repository;
    private final Grade_cargosRepository cargosRepository;
    private final EnderecoRepository enderecoRepository;
    private final Registro_funcionariosRepository registroRepository;

    @Transactional
    public void atualizarFuncionario(Integer id, FuncionariosUpdate dto) {
        Funcionarios funcionario = repository.findById(id).orElseThrow(() -> new RuntimeException("Funcionario nao encontrado"));

        Grade_cargos cargo = cargosRepository.findById(dto.getId_cargo()).orElseThrow(() -> new RuntimeException("Cargo nao encontrado"));

        funcionario.setCargo(cargo);
        funcionario.setNome(dto.getNome());
        funcionario.setCpf(dto.getCpf());
        funcionario.setEmail(dto.getEmail());
        funcionario.setData_nascimento(dto.getData_nascimento());
        funcionario.setCelular(dto.getCelular());

        repository.save(funcionario);
    }

    @Transactional
    public void inserirFuncionario(FuncionariosUpdate dto) {
        Funcionarios funcionario = new Funcionarios();

        Grade_cargos cargo = cargosRepository.findById(dto.getId_cargo()).orElseThrow(() -> new RuntimeException("Cargo nao encontrado"));

        Endereco endereco = new Endereco();
        endereco.setBairro("");
        endereco.setRua("");
        endereco.setCep("");
        endereco.setCidade("");
        endereco.setComplemento("");
        endereco.setNumero(0);

        funcionario.setCargo(cargo);
        funcionario.setEndereco(endereco);
        funcionario.setCodigo(dto.getCodigo());
        funcionario.setNome(dto.getNome());
        funcionario.setCpf(dto.getCpf());
        funcionario.setEmail(dto.getEmail());
        funcionario.setData_nascimento(dto.getData_nascimento());
        funcionario.setCelular(dto.getCelular());

        Funcionarios funcionarioSalvo = repository.save(funcionario);

        Registro_funcionarios registro = new Registro_funcionarios();

        registro.setData_admissao(LocalDate.now());
        registro.setData_demissao(LocalDate.of(9999, 12, 31));
        registro.setFuncionarios(funcionarioSalvo);

        registroRepository.save(registro);
    }

    public FuncionariosService(FuncionariosRepository repository, Grade_cargosRepository cargosRepository, EnderecoRepository enderecoRepository, Registro_funcionariosRepository registroRepository) {
        this.repository = repository;
        this.cargosRepository = cargosRepository;
        this.enderecoRepository = enderecoRepository;
        this.registroRepository = registroRepository;
    }
}

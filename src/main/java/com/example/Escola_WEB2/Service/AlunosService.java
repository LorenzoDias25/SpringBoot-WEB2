package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.DTO.AlunosUpdate;
import com.example.Escola_WEB2.Model.Alunos;
import com.example.Escola_WEB2.Model.Endereco;
import com.example.Escola_WEB2.Repository.AlunosRepository;
import com.example.Escola_WEB2.Repository.EnderecoRepository;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
// Importe suas entidades e DTO

@Service
public class AlunosService {

    private final AlunosRepository alunoRepository;
    private final EnderecoRepository enderecoRepository;

    public AlunosService(AlunosRepository alunoRepository, EnderecoRepository enderecoRepository) {
        this.alunoRepository = alunoRepository;
        this.enderecoRepository = enderecoRepository;
    }

    @Transactional // Garante que tudo seja salvo ou nada (em caso de erro)
    public void atualizarAluno(Integer id, AlunosUpdate dto) {

        // 1. Busca o Aluno do banco
        // (Usei seu nome 'Alunos' da classe, mas o ideal é 'Aluno')
        Alunos aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado!"));

        // 2. Busca o Endereco associado
        // (Assumindo que sua entidade Aluno tem um 'getEndereco()')
        Endereco endereco = aluno.getEndereco();
        // Se o aluno puder não ter um endereço, adicione:
        if (endereco == null) {
            endereco = new Endereco();
            aluno.setEndereco(endereco); // Associa o novo endereço ao aluno
        }

        // 3. Atualiza os dados do Aluno (mapeamento)
        aluno.setMatricula(dto.getMatricula());
        aluno.setNome(dto.getNome());
        aluno.setCpf(dto.getCpf());
        aluno.setEmail(dto.getEmail());
        aluno.setCelular(Integer.parseInt(dto.getCelular()));
        aluno.setData_nascimento(dto.getNascimento());

        // 4. Atualiza os dados do Endereço (mapeamento)
        endereco.setRua(dto.getRua());
        endereco.setCep(dto.getCep());
        endereco.setNumero(Integer.parseInt(dto.getNumero()));
        endereco.setBairro(dto.getBairro());
        endereco.setCidade(dto.getCidade());
        endereco.setComplemento(dto.getComplemento());

        // 5. Salva as entidades
        // Se o relacionamento (ex: @ManyToOne) tiver 'cascade = CascadeType.ALL',
        // salvar o aluno já salva o endereço junto.
        alunoRepository.save(aluno);

        // Se não tiver cascade, salve o endereço também:
        // enderecoRepository.save(endereco);
    }

    @Transactional
    public void criarAluno(AlunosUpdate dto) {

        Endereco novoEndereco = new Endereco();
        novoEndereco.setRua(dto.getRua());
        novoEndereco.setCep(dto.getCep());
        novoEndereco.setNumero(Integer.parseInt(dto.getNumero()));
        novoEndereco.setBairro(dto.getBairro());
        novoEndereco.setCidade(dto.getCidade());
        novoEndereco.setComplemento(dto.getComplemento());

        String novaMatricula = gerarNovaMatricula();
        
        Alunos aluno = new Alunos();
        Endereco enderecoSalvo = enderecoRepository.save(novoEndereco);

        aluno.setEndereco(enderecoSalvo);
        
        aluno.setMatricula(novaMatricula);
        
        aluno.setNome(dto.getNome());
        aluno.setCpf(dto.getCpf());
        aluno.setEmail(dto.getEmail());
        aluno.setCelular(Integer.parseInt(dto.getCelular()));
        aluno.setData_nascimento(dto.getNascimento());

        alunoRepository.save(aluno);
    }

    private String gerarNovaMatricula() {

        Optional<Alunos> ultimoAluno = alunoRepository.findTopByOrderByMatriculaDesc();

        if (ultimoAluno.isEmpty()) {
            // Se for o primeiro aluno, comece com 01
            return "A" + LocalDate.now().getYear() + "01";
        }

        String ultimaMatricula = ultimoAluno.get().getMatricula(); // Ex: A202502

        // Assumindo que o prefixo tem 6 caracteres (A2025)
        String prefixo = ultimaMatricula.substring(0, 6);

        // Pega o número sequencial (os dois últimos dígitos)
        String sufixoStr = ultimaMatricula.substring(6); // Ex: "02"

        try {
            int numeroAtual = Integer.parseInt(sufixoStr); // Ex: 2
            int proximoNumero = numeroAtual + 1;           // Ex: 3

            // Formata o número de volta com zeros à esquerda (ex: 3 -> 03)
            String novoSufixo = String.format("%0" + sufixoStr.length() + "d", proximoNumero);

            return prefixo + novoSufixo; // Ex: A202503

        } catch (NumberFormatException e) {
            // Caso o formato esteja incorreto no banco de dados, trate o erro
            throw new RuntimeException("Erro ao processar a matrícula: formato inválido.", e);
        }
    }
}

package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.Model.Alunos;
import com.example.Escola_WEB2.Model.Ano_letivo;
import com.example.Escola_WEB2.Model.Boleto;
import com.example.Escola_WEB2.Model.Contas;
import com.example.Escola_WEB2.Model.Disciplinas;
import com.example.Escola_WEB2.Model.Endereco;
import com.example.Escola_WEB2.Model.Eventos;
import com.example.Escola_WEB2.Model.Funcionarios;
import com.example.Escola_WEB2.Model.Grade_cargos;
import com.example.Escola_WEB2.Model.Grade_disciplinas;
import com.example.Escola_WEB2.Model.Locais;
import com.example.Escola_WEB2.Model.Matriculas_disciplinas;
import com.example.Escola_WEB2.Model.Registro_funcionarios;
import com.example.Escola_WEB2.Model.TipoEvento;
import com.example.Escola_WEB2.Model.Turmas;
import com.example.Escola_WEB2.Model.Usuario;
import com.example.Escola_WEB2.Repository.AlunosRepository;
import com.example.Escola_WEB2.Repository.Ano_letivoRepository;
import com.example.Escola_WEB2.Repository.BoletoRepository;
import com.example.Escola_WEB2.Repository.ContasRepository;
import com.example.Escola_WEB2.Repository.DisciplinasRepository;
import com.example.Escola_WEB2.Repository.EnderecoRepository;
import com.example.Escola_WEB2.Repository.EventosRepository;
import com.example.Escola_WEB2.Repository.FuncionariosRepository;
import com.example.Escola_WEB2.Repository.Grade_cargosRepository;
import com.example.Escola_WEB2.Repository.Grade_disciplinasRepository;
import com.example.Escola_WEB2.Repository.LocaisRepository;
import com.example.Escola_WEB2.Repository.Matriculas_disciplinasRepository;
import com.example.Escola_WEB2.Repository.Registro_funcionariosRepository;
import com.example.Escola_WEB2.Repository.Tipo_eventoRepository;
import com.example.Escola_WEB2.Repository.TurmasRepository;
import com.example.Escola_WEB2.Repository.UsuarioRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/testes")
public class TestesRestController {

    private final AlunosRepository alunosRepository;
    private final Ano_letivoRepository ano_letivoRepository;
    private final BoletoRepository boletoRepository;
    private final ContasRepository contasRepository;
    private final DisciplinasRepository disciplinasRepository;
    private final EnderecoRepository enderecoRepository;
    private final EventosRepository eventosRepository;
    private final FuncionariosRepository funcionariosRepository;
    private final Grade_cargosRepository grade_cargosRepository;
    private final Grade_disciplinasRepository grade_disciplinasRepository;
    private final LocaisRepository locaisRepository;
    private final Matriculas_disciplinasRepository matriculas_disciplinasRepository;
    private final Registro_funcionariosRepository registro_funcionariosRepository;
    private final Tipo_eventoRepository tipo_eventoRepository;
    private final TurmasRepository turmasRepository;
    private final UsuarioRepository usuarioRepository;

    @GetMapping("/alunos")
    public List<Alunos> TesteAlunos() {
        return alunosRepository.findAll();
    }

    @GetMapping("/ano_letivo")
    public List<Ano_letivo> TesteAno_letivo() {
        return ano_letivoRepository.findAll();
    }

    @GetMapping("/boleto")
    public List<Boleto> TesteBoleto() {
        return boletoRepository.findAll();
    }

    @GetMapping("/contas")
    public List<Contas> TesteContas() {
        return contasRepository.findAll();
    }

    @GetMapping("/disciplinas")
    public List<Disciplinas> TesteDisciplinas() {
        return disciplinasRepository.findAll();
    }

    @GetMapping("/endereco")
    public List<Endereco> TesteEndereco() {
        return enderecoRepository.findAll();
    }

    @GetMapping("/eventos")
    public List<Eventos> TesteEventos() {
        return eventosRepository.findAll();
    }

    @GetMapping("/funcionarios")
    public List<Funcionarios> TesteFuncionarios() {
        return funcionariosRepository.findAll();
    }

    @GetMapping("/grade_cargos")
    public List<Grade_cargos> TesteGrade_cargos() {
        return grade_cargosRepository.findAll();
    }

    @GetMapping("/grade_disciplinas")
    public List<Grade_disciplinas> TesteGrade_disciplinas() {
        return grade_disciplinasRepository.findAll();
    }

    @GetMapping("/locais")
    public List<Locais> TesteLocais() {
        return locaisRepository.findAll();
    }

    @GetMapping("/matriculas_disciplinas")
    public List<Matriculas_disciplinas> TesteMatriculas_disciplinas() {
        return matriculas_disciplinasRepository.findAll();
    }

    @GetMapping("/registro_funcionarios")
    public List<Registro_funcionarios> TesteRegistro_funcionarios() {
        return registro_funcionariosRepository.findAll();
    }

    @GetMapping("/tipo_evento")
    public List<TipoEvento> TesteTipo_evento() {
        return tipo_eventoRepository.findAll();
    }

    @GetMapping("/turmas")
    public List<Turmas> TesteTurmas() {
        return turmasRepository.findAll();
    }

    @GetMapping("/usuario")
    public List<Usuario> TesteUsuario() {
        return usuarioRepository.findAll();
    }

    public TestesRestController(AlunosRepository alunosRepository, Ano_letivoRepository ano_letivoRepository, BoletoRepository boletoRepository, ContasRepository contasRepository, DisciplinasRepository disciplinasRepository, EnderecoRepository enderecoRepository, EventosRepository eventosRepository, FuncionariosRepository funcionariosRepository, Grade_cargosRepository grade_cargosRepository, Grade_disciplinasRepository grade_disciplinasRepository, LocaisRepository locaisRepository, Matriculas_disciplinasRepository matriculas_disciplinasRepository, Registro_funcionariosRepository registro_funcionariosRepository, Tipo_eventoRepository tipo_eventoRepository, TurmasRepository turmasRepository, UsuarioRepository usuarioRepository) {
        this.alunosRepository = alunosRepository;
        this.ano_letivoRepository = ano_letivoRepository;
        this.boletoRepository = boletoRepository;
        this.contasRepository = contasRepository;
        this.disciplinasRepository = disciplinasRepository;
        this.enderecoRepository = enderecoRepository;
        this.eventosRepository = eventosRepository;
        this.funcionariosRepository = funcionariosRepository;
        this.grade_cargosRepository = grade_cargosRepository;
        this.grade_disciplinasRepository = grade_disciplinasRepository;
        this.locaisRepository = locaisRepository;
        this.matriculas_disciplinasRepository = matriculas_disciplinasRepository;
        this.registro_funcionariosRepository = registro_funcionariosRepository;
        this.tipo_eventoRepository = tipo_eventoRepository;
        this.turmasRepository = turmasRepository;
        this.usuarioRepository = usuarioRepository;
    }

}

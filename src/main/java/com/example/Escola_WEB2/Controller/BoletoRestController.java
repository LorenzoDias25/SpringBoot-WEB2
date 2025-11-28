package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.DTO.BoletoUpdate;
import com.example.Escola_WEB2.Enums.Status_boleto;
import com.example.Escola_WEB2.Model.Boleto;
import com.example.Escola_WEB2.Repository.BoletoRepository;
import com.example.Escola_WEB2.Service.BoletoService;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boleto")
public class BoletoRestController {

    private final BoletoRepository boletoRepository;
    private final BoletoService service;

    @GetMapping("/todos")
    public List<Boleto> getAllBoletos() {
        return boletoRepository.findAll();
    }

    @GetMapping("/por-aluno/{alunosId}")
    public List<Boleto> getPorAluno(@PathVariable Integer alunosId) {
        return boletoRepository.findByAlunosId(alunosId);
    }

    @GetMapping("/pesquisar")
    public List<Boleto> pesquisarBoletos(
            @RequestParam(value = "termo", defaultValue = "") String termo,
            @RequestParam(value = "tipo", defaultValue = "") String tipo,
            @RequestParam(value = "matricula", defaultValue = "") String matricula) {

        // 2. Decide qual método de busca usar (baseado no "Pesquisar por:")
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dataConvertida = null;
        switch (tipo) {
            case "emissao":
                return boletoRepository.findByDataEmissaoAndAlunosMatricula(LocalDate.parse(termo, formatter), matricula);
            case "vencimento":
                return boletoRepository.findByDataVencimentoAndAlunosMatricula(LocalDate.parse(termo, formatter), matricula);
            case "valor":
                return boletoRepository.findByValorAndAlunosMatricula(Double.parseDouble(termo), matricula);
            default:
                return boletoRepository.findByStatusAndAlunosMatricula(Status_boleto.valueOf(termo), matricula);
        }
    }

    @PutMapping("/salvar/{id}")
    public ResponseEntity<Void> atualizarBoleto(@PathVariable Integer id, @RequestBody BoletoUpdate dto) {
        service.atualizarBoleto(id, dto);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> inserirBoleto(@RequestBody BoletoUpdate dto) {

        service.criarBoleto(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public BoletoRestController(BoletoRepository boletoRepository, BoletoService service) {
        this.boletoRepository = boletoRepository;
        this.service = service;
    }
}

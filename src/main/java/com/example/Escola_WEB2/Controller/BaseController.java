package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.Model.Eventos;
import com.example.Escola_WEB2.Repository.EventosRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class BaseController {

    private final EventosRepository eventosRepository;

    @GetMapping("/index")
    public String Index(Model model) {
        List<Eventos> listaCompleta = eventosRepository.findAll();

        List<Eventos> copia = new ArrayList<>(listaCompleta);

        Collections.shuffle(copia);

        List<Eventos> listaEventos = listaCompleta.stream().limit(6).collect(Collectors.toList());

        Eventos principal = copia.getFirst();
        model.addAttribute("eventosList", listaEventos);
        model.addAttribute("principal", principal);
        return "index";
    }

    @GetMapping("/alunos")
    public String AlunosPage() {
        return "alunos";
    }

    @GetMapping("/disciplinas")
    public String DisciplinasPage() {
        return "disciplinas";
    }

    @GetMapping("/eventos")
    public String EventosPage() {
        return "eventos";
    }

    @GetMapping("/turmas")
    public String TurmasPage() {
        return "turmas";
    }

    public BaseController(EventosRepository eventosRepository) {
        this.eventosRepository = eventosRepository;
    }

}

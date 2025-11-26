package com.example.Escola_WEB2.Controller;

import com.example.Escola_WEB2.Model.Usuario;
import com.example.Escola_WEB2.Repository.UsuarioRepository;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    private final UsuarioRepository repository;

    @GetMapping("/me")
    public ResponseEntity<Usuario> getUsuarioLogado(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        String email = principal.getName();

        Usuario usuario = repository.findByEmail(email).orElseThrow();

        return ResponseEntity.ok(usuario);
    }

    public AuthRestController(UsuarioRepository repository) {
        this.repository = repository;
    }
}

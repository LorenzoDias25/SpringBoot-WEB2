package com.example.Escola_WEB2.Service;

import com.example.Escola_WEB2.Model.Usuario;
import com.example.Escola_WEB2.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Tenta achar. Se não achar, o Spring lança o erro que vai virar a mensagem na tela.
//        System.out.println("--- TENTATIVA DE LOGIN ---");
//        System.out.println("O usuário digitou: " + username);

        Usuario usuario = repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

//        System.out.println(usuario.toString());

        
        
        return usuario;
    }
}

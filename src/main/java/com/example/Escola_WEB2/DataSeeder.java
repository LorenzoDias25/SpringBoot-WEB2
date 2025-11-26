//package com.example.Escola_WEB2;
//
//import com.example.Escola_WEB2.Enums.Tipo_usuario;
//import com.example.Escola_WEB2.Model.Usuario;
//import com.example.Escola_WEB2.Repository.UsuarioRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DataSeeder implements CommandLineRunner {
//
//    @Autowired
//    UsuarioRepository usuarioRepository;
//    @Autowired
//    PasswordEncoder passwordEncoder;
//
//    @Override
//    public void run(String... args) throws Exception {
//
//        // Criar o ADMIN (Caso 2)
//        if (usuarioRepository.findByEmail("admin").isEmpty()) {
//            Usuario admin = new Usuario();
//            admin.setEmail("admin");
//            admin.setSenha(passwordEncoder.encode("123")); // Criptografa a senha
//            admin.setTipoUsuario(Tipo_usuario.valueOf(("adm")));
//            usuarioRepository.save(admin);
//        }
//
//        // Criar o ALUNO (Caso 1)
//        if (usuarioRepository.findByEmail("aluno").isEmpty()) {
//            Usuario aluno = new Usuario();
//            aluno.setEmail("aluno");
//            aluno.setSenha(passwordEncoder.encode("123"));
//            aluno.setTipoUsuario(Tipo_usuario.valueOf(("aluno")));
//            usuarioRepository.save(aluno);
//        }
//    }
//}

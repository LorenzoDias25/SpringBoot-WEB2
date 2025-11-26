package com.example.Escola_WEB2.Configuration;

import com.example.Escola_WEB2.Service.AutenticacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    private AutenticacaoService service;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // 1. DESABILITAR CSRF (Crucial para testes de API/Postman)
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                // Suas regras de permissão continuam aqui...
                .requestMatchers("/css/**", "/js/**", "/assets/**").permitAll()
                .requestMatchers("/login").permitAll()
                .requestMatchers("/index").permitAll()
                .requestMatchers("/perfil").hasRole("ALUNO")
                .requestMatchers("/historico").hasRole("ALUNO")
                .requestMatchers("/mensalidades").hasRole("ALUNO")
                .requestMatchers("/contas").hasRole("ADM")
                .requestMatchers("/funcionarios").hasRole("ADM")
                .requestMatchers("/alunos").hasAnyRole("SECRETARIO", "ADM")
                .requestMatchers("/disciplinas").hasAnyRole("SECRETARIO", "ADM")
                .requestMatchers("/turmas").hasAnyRole("SECRETARIO", "ADM")
                .requestMatchers("/eventos").hasAnyRole("SECRETARIO", "ADM")
                .requestMatchers("/api/**").permitAll()
                //.requestMatchers("/api/alunos/**").hasRole("ADM") // Exemplo
                .anyRequest().authenticated()
                )
                // 2. MANTENHA O FORM LOGIN (Para o seu site funcionar no navegador)
                .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/index", true)
                .permitAll()
                )
                // 3. ADICIONE O HTTP BASIC (Para o Postman funcionar facilmente)
                //.httpBasic(Customizer.withDefaults())
                .logout(logout -> logout
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login?logout"))
                .build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(service); // <--- O PULO DO GATO
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Criptografia obrigatória

        //return org.springframework.security.crypto.password.NoOpPasswordEncoder.getInstance();
    }
}

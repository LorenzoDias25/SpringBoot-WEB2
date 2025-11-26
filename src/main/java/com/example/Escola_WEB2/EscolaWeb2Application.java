package com.example.Escola_WEB2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EscolaWeb2Application {

    public static void main(String[] args) {
        SpringApplication.run(EscolaWeb2Application.class, args);

    }
//
//    @Bean
//    public CommandLineRunner testeHash() {
//        return args -> {
//            System.out.println("--- HASH NOVO PARA aluno ---");
//            System.out.println(new BCryptPasswordEncoder().encode("aluno"));
//            System.out.println("--------------------------");
//            System.out.println("--- HASH NOVO PARA adm ---");
//            System.out.println(new BCryptPasswordEncoder().encode("adm"));
//            System.out.println("--------------------------");
//        };
//    }
}

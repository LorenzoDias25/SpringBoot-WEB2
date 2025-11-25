package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Grade_cargos;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Grade_cargosRepository extends JpaRepository<Grade_cargos, Integer> {

    Optional<Grade_cargos> findByNomeContainingIgnoreCase(String nome);
}

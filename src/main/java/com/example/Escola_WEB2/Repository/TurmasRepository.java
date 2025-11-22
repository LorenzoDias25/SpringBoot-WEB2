package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Turmas;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TurmasRepository extends JpaRepository<Turmas, Integer> {

    List<Turmas> findAllByOrderByCodigoAsc();

    List<Turmas> findByCodigoContainingIgnoreCase(String nome, Sort sort);

    List<Turmas> findByNomeContainingIgnoreCase(String nome, Sort sort);

    List<Turmas> findByTurnoContainingIgnoreCase(String nome, Sort sort);
}

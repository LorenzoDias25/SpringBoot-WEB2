package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Disciplinas;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DisciplinasRepository extends JpaRepository<Disciplinas, Integer> {

    List<Disciplinas> findAllByOrderByCodigoAsc();

    List<Disciplinas> findByCodigoContainingIgnoreCase(String codigo, Sort sort);

    List<Disciplinas> findByNomeContainingIgnoreCase(String nome, Sort sort);
}

package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.TipoEvento;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Tipo_eventoRepository extends JpaRepository<TipoEvento, Integer> {

    List<TipoEvento> findByNomeContainingIgnoreCase(String nome);

    List<TipoEvento> findAllByOrderByNomeAsc();
}

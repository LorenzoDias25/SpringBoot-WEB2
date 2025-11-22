package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Eventos;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EventosRepository extends JpaRepository<Eventos, Integer>{


    List<Eventos> findByNomeContainingIgnoreCase(String nome, Sort sort);

    List<Eventos> findByDataInicio(LocalDate dataInicio, Sort sort);
    
    List<Eventos> findByDataFim(LocalDate dataFim, Sort sort);
    
    List<Eventos> findByTipoEventoNomeContainingIgnoreCase(String nomeTipo, Sort sort);
    
    List<Eventos> findByTipoEventoLocaisNomeContainingIgnoreCase(String nomeLocal, Sort sort);
    
    List<Eventos> findAllByOrderByNomeAsc();
}

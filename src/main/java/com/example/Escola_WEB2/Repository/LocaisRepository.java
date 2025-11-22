package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Locais;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LocaisRepository extends JpaRepository<Locais, Integer>{

    List<Locais> findByNomeContainingIgnoreCase(String nome);
    
    List<Locais> findAllByOrderByNomeAsc();
}

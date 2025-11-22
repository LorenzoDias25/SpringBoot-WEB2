package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Boleto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BoletoRepository extends JpaRepository<Boleto, Integer>{

    List<Boleto> findByAlunosId(Integer alunosId);
}

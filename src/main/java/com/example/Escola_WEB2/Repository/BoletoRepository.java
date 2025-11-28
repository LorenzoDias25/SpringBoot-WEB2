package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Enums.Status_boleto;
import com.example.Escola_WEB2.Model.Boleto;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoletoRepository extends JpaRepository<Boleto, Integer> {

    List<Boleto> findByAlunosId(Integer alunosId);

    List<Boleto> findByStatusAndAlunosMatricula(Status_boleto status, String matricula);

    List<Boleto> findByDataEmissaoAndAlunosMatricula(LocalDate termo, String matricula);

    List<Boleto> findByDataVencimentoAndAlunosMatricula(LocalDate termo, String matricula);

    List<Boleto> findByValorAndAlunosMatricula(Double valor, String matricula);
}

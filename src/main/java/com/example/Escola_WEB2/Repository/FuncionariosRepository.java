package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Funcionarios;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionariosRepository extends JpaRepository<Funcionarios, Integer> {

    List<Funcionarios> findByCargoNomeContainingIgnoreCase(String nomeDoCargo);

    Funcionarios findByCodigo(String codigo);
}

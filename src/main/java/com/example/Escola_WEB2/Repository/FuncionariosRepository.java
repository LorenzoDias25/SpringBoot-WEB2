package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Funcionarios;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionariosRepository extends JpaRepository<Funcionarios, Integer> {

    List<Funcionarios> findByCargoNomeContainingIgnoreCase(String nomeDoCargo, Sort sort);

    List<Funcionarios> findByCargoNomeContainingIgnoreCase(String nomeDoCargo);

    Funcionarios findByCodigo(String codigo);

    List<Funcionarios> findAllByOrderByNomeAsc();

    List<Funcionarios> findByNomeContainingIgnoreCase(String termo, Sort sort);

    List<Funcionarios> findByEmailContainingIgnoreCase(String termo, Sort sort);

    List<Funcionarios> findByCodigoContainingIgnoreCase(String nome, Sort sort);
}

package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Registro_funcionarios;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Registro_funcionariosRepository extends JpaRepository<Registro_funcionarios, Integer> {

    Optional<Registro_funcionarios> findByFuncionariosId(Integer id);
}

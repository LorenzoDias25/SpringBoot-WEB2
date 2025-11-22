package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Enums.Tipo_usuario;
import com.example.Escola_WEB2.Model.Contas;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContasRepository extends JpaRepository<Contas, Integer> {

    List<Contas> findAllByOrderByCodigoAsc();

    List<Contas> findByCodigoContainingIgnoreCase(String termo, Sort sort);

    List<Contas> findByEmailContainingIgnoreCase(String termo, Sort sort);

    List<Contas> findByAtivo(Boolean termo);

    List<Contas> findByTipoUsuario(Tipo_usuario tipo);
}

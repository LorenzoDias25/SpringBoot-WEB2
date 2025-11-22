package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Alunos;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunosRepository extends JpaRepository<Alunos, Integer> {

    // Busca por: "SELECT ... FROM alunos WHERE nome LIKE ? ORDER BY ..."
    List<Alunos> findByNomeContainingIgnoreCase(String nome, Sort sort);

    // Busca por: "SELECT ... FROM alunos WHERE matricula LIKE ? ORDER BY ..."
    List<Alunos> findByMatriculaContainingIgnoreCase(String matricula, Sort sort);

    Optional<Alunos> findTopByOrderByMatriculaDesc();
    
    List<Alunos> findAllByOrderByNomeAsc();
}

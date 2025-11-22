package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Grade_disciplinas;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Grade_disciplinasRepository extends JpaRepository<Grade_disciplinas, Integer> {

    List<Grade_disciplinas> findByDisciplinasCodigo(String codigo);

    List<Grade_disciplinas> findByTurmasCodigo(String codigo);
}

package com.example.Escola_WEB2.Repository;

import com.example.Escola_WEB2.Model.Matriculas_disciplinas;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Matriculas_disciplinasRepository extends JpaRepository<Matriculas_disciplinas, Integer> {

    List<Matriculas_disciplinas> findByAlunosId(Integer alunosId);

    List<Matriculas_disciplinas> findByDisciplinaCodigo(String codigo);

    List<Matriculas_disciplinas> findByGradeDisciplinasTurmasCodigo(String codigoTurma);
}

package com.biblioteca.demo.repositories;

import com.biblioteca.demo.entities.Emprestimo;
import com.biblioteca.demo.entities.StatusEmprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {

    @Query(nativeQuery = true, value = "SELECT categoria " +
            "FROM emprestimo " +
            "INNER JOIN livro on livro.id = emprestimo.livro_id " +
            "WHERE emprestimo.usuario_id = :usuario_id"
            )
    List<String> findCategoriasEmprestadas(Long usuario_id);

    boolean existsByLivroIdAndStatus(Long livroId, StatusEmprestimo status);

}

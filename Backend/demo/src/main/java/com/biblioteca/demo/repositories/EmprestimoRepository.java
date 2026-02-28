package com.biblioteca.demo.repositories;

import com.biblioteca.demo.entities.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {

    @Query("""
       SELECT DISTINCT e.livro.categoria
       FROM Emprestimo e
       WHERE e.usuario.id = :usuario_id
       """)
    List<String> findCategoriasEmprestadas(Long usuario_id);

}

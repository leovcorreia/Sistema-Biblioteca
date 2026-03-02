package com.biblioteca.demo.repositories;

import com.biblioteca.demo.entities.Livro;
import com.biblioteca.demo.projections.LivroProjection;
import com.biblioteca.demo.projections.UsuarioProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {

    @Query("""
       SELECT l
       FROM Livro l
       WHERE l.categoria IN :categorias
       AND l.id NOT IN (
            SELECT e.livro.id
            FROM Emprestimo e
            WHERE e.usuario.id = :usuario_id
       )
       """)
    Page<Livro> findLivrosRecomendados(
            Long usuario_id,
            List<String> categorias,
            Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT l.id AS id, l.titulo AS titulo " +
            "FROM livro l " +
            "WHERE UPPER(l.titulo) LIKE CONCAT('%', UPPER(:titulo), '%') ")
    Page<LivroProjection> searchByTitulo(String titulo, Pageable pageable);

}

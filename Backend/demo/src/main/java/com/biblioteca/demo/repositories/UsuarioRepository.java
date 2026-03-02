package com.biblioteca.demo.repositories;

import com.biblioteca.demo.entities.Usuario;
import com.biblioteca.demo.projections.UsuarioProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query(nativeQuery = true, value = "SELECT u.id AS id, u.nome AS nome " +
            "FROM usuario u " +
            "WHERE UPPER(u.nome) LIKE CONCAT('%', UPPER(:nome), '%') ")
    Page<UsuarioProjection> searchByName(String nome, Pageable pageable);

}

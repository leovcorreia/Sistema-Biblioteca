package com.biblioteca.demo.dto.livros;

import com.biblioteca.demo.entities.Livro;
import com.biblioteca.demo.projections.LivroProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LivroDTO {

    private Long id;
    private String titulo;
    private String autor;
    private String isbn;
    private LocalDate data_publicacao;
    private String categoria;

    public LivroDTO(Livro entity) {
        this.id = entity.getId();
        this.titulo = entity.getTitulo();
        this.autor = entity.getAutor();
        this.isbn = entity.getIsbn();
        this.data_publicacao = entity.getData_publicacao();
        this.categoria = entity.getCategoria();
    }

    public LivroDTO(LivroProjection livroProjection) {
        this.id = livroProjection.getId();
        this.titulo = livroProjection.getTitulo();
    }
}

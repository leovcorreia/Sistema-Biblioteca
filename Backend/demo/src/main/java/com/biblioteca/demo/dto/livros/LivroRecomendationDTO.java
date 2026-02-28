package com.biblioteca.demo.dto.livros;

import com.biblioteca.demo.entities.Livro;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LivroRecomendationDTO {

    private Long id;
    private String titulo;
    private String autor;
    private String categoria;

    public LivroRecomendationDTO(Livro entity) {
        this.id = entity.getId();
        this.titulo = entity.getTitulo();
        this.autor = entity.getAutor();
        this.categoria = entity.getCategoria();
    }

}

package com.biblioteca.demo.dto.usuarios;

import com.biblioteca.demo.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioResponseDTO {

    private Long id;

    private String nome;

    private String email;

    private LocalDateTime data_cadastro;

    private String telefone;

    public UsuarioResponseDTO(Usuario entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.email = entity.getEmail();
        this.data_cadastro = entity.getData_cadastro();
        this.telefone = entity.getTelefone();
    }
}

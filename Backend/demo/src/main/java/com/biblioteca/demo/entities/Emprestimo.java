package com.biblioteca.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;

@Entity
public class Emprestimo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long usuario_id;

    @NotNull
    private Long livro_id;

    @NotNull
    @PastOrPresent
    private LocalDate data_emprestimo;

    @NotNull
    private LocalDate data_devolucao;

    @NotBlank
    private String status;

}

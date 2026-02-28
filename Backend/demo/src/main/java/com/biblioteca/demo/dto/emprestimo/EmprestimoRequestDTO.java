package com.biblioteca.demo.dto.emprestimo;

import com.biblioteca.demo.entities.StatusEmprestimo;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmprestimoRequestDTO {

    @NotNull
    private Long usuario_id;

    @NotNull
    private Long livro_id;

    @NotNull
    @PastOrPresent
    private LocalDate data_emprestimo;

    @NotNull
    private LocalDate data_devolucao;

    @NotNull
    private StatusEmprestimo status;
}

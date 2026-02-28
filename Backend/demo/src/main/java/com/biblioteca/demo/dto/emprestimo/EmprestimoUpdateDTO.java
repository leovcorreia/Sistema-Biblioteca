package com.biblioteca.demo.dto.emprestimo;

import com.biblioteca.demo.entities.StatusEmprestimo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmprestimoUpdateDTO {

    private StatusEmprestimo status;
    private LocalDate data_devolucao;

}

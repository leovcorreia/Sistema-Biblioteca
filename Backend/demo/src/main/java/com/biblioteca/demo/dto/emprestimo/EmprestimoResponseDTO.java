package com.biblioteca.demo.dto.emprestimo;

import com.biblioteca.demo.entities.Emprestimo;
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
public class EmprestimoResponseDTO {

    private Long id;
    private Long usuario_id;
    private Long livro_id;
    private LocalDate data_emprestimo;
    private LocalDate data_devolucao;
    private StatusEmprestimo status;

    public EmprestimoResponseDTO(Emprestimo entity) {
        this.id = entity.getId();
        this.usuario_id = entity.getUsuario().getId();
        this.livro_id = entity.getLivro().getId();
        this.data_emprestimo = entity.getData_emprestimo();
        this.data_devolucao = entity.getData_devolucao();
        this.status = entity.getStatus();
    }
}

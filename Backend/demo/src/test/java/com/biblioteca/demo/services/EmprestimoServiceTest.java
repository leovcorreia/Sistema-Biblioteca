package com.biblioteca.demo.services;

import com.biblioteca.demo.dto.emprestimo.EmprestimoRequestDTO;
import com.biblioteca.demo.dto.emprestimo.EmprestimoResponseDTO;
import com.biblioteca.demo.dto.emprestimo.EmprestimoUpdateDTO;
import com.biblioteca.demo.entities.Emprestimo;
import com.biblioteca.demo.entities.Livro;
import com.biblioteca.demo.entities.StatusEmprestimo;
import com.biblioteca.demo.entities.Usuario;
import com.biblioteca.demo.repositories.EmprestimoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmprestimoServiceTest {

    @Mock
    private EmprestimoRepository emprestimoRepository;

    @InjectMocks
    private EmprestimoService emprestimoService;

    @Test
    void deveAtualizarStatusEDatadeDevolucao() {

        Long id = 1L;

        Emprestimo emprestimoExistente = new Emprestimo();
        emprestimoExistente.setId(id);
        emprestimoExistente.setStatus(StatusEmprestimo.ATIVO);

        Usuario usuario = new Usuario();
        usuario.setId(10L);
        emprestimoExistente.setUsuario(usuario);

        Livro livro = new Livro();
        livro.setId(20L);
        emprestimoExistente.setLivro(livro);

        when(emprestimoRepository.findById(id))
                .thenReturn(Optional.of(emprestimoExistente));

        // 👇 MOCK DO SAVE (ESSENCIAL)
        when(emprestimoRepository.save(any(Emprestimo.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        EmprestimoUpdateDTO dto = new EmprestimoUpdateDTO();
        dto.setStatus(StatusEmprestimo.DEVOLVIDO);
        dto.setData_devolucao(LocalDate.now());

        EmprestimoResponseDTO response = emprestimoService.atualizar(id, dto);

        assertEquals(StatusEmprestimo.DEVOLVIDO, response.getStatus());
        assertEquals(LocalDate.now(), response.getData_devolucao());

        verify(emprestimoRepository).save(any(Emprestimo.class));
    }

    @Test
    void deveLancarExcecaoQuandoEmprestimoNaoExiste() {

        Long id = 99L;

        when(emprestimoRepository.findById(id))
                .thenReturn(Optional.empty());

        EmprestimoUpdateDTO dto = new EmprestimoUpdateDTO();

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> emprestimoService.atualizar(id, dto)
        );

        assertEquals("Empréstimo não encontrado", exception.getMessage());
    }

}

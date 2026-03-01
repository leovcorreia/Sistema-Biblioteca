package com.biblioteca.demo.services;

import com.biblioteca.demo.dto.livros.LivroRecomendationDTO;
import com.biblioteca.demo.entities.Livro;
import com.biblioteca.demo.repositories.EmprestimoRepository;
import com.biblioteca.demo.repositories.LivroRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private EmprestimoRepository emprestimoRepository;

    @Mock
    private LivroRepository livroRepository;

    @InjectMocks
    private LivroService livroService;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void deveRetornarPaginaVaziaQuandoUsuarioNaoTemCategorias() {

        Long usuarioId = 1L;
        Pageable pageable = PageRequest.of(0, 5);

        when(emprestimoRepository.findCategoriasEmprestadas(usuarioId))
                .thenReturn(Collections.emptyList());

        Page<LivroRecomendationDTO> resultado =
                usuarioService.recomendarLivros(usuarioId, pageable);

        assertTrue(resultado.isEmpty());

        verify(livroRepository, never())
                .findLivrosRecomendados(any(), any(), any());
    }

    @Test
    void deveRetornarLivrosRecomendados() {

        Long usuarioId = 1L;
        Pageable pageable = PageRequest.of(0, 5);

        List<String> categorias = List.of("FICCAO");

        when(emprestimoRepository.findCategoriasEmprestadas(usuarioId))
                .thenReturn(categorias);

        Livro livro = new Livro();
        livro.setId(10L);
        livro.setTitulo("1984");
        livro.setAutor("George Orwell");
        livro.setCategoria("FICCAO");

        Page<Livro> paginaLivros =
                new PageImpl<>(List.of(livro), pageable, 1);

        when(livroRepository.findLivrosRecomendados(
                usuarioId,
                categorias,
                pageable))
                .thenReturn(paginaLivros);

        Page<LivroRecomendationDTO> resultado =
                usuarioService.recomendarLivros(usuarioId, pageable);

        assertFalse(resultado.isEmpty());
        assertEquals(1, resultado.getTotalElements());

        LivroRecomendationDTO dto = resultado.getContent().get(0);

        assertEquals("1984", dto.getTitulo());
        assertEquals("George Orwell", dto.getAutor());
        assertEquals("FICCAO", dto.getCategoria());

        verify(livroRepository)
                .findLivrosRecomendados(usuarioId, categorias, pageable);
    }

}

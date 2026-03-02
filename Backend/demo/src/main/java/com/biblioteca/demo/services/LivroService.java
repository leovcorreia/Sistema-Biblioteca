package com.biblioteca.demo.services;

import com.biblioteca.demo.dto.livros.*;
import com.biblioteca.demo.dto.usuarios.UsuarioDTO;
import com.biblioteca.demo.entities.Livro;
import com.biblioteca.demo.projections.LivroProjection;
import com.biblioteca.demo.projections.UsuarioProjection;
import com.biblioteca.demo.repositories.EmprestimoRepository;
import com.biblioteca.demo.repositories.LivroRepository;
import com.biblioteca.demo.services.exceptions.DatabaseException;
import com.biblioteca.demo.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Transactional(readOnly = true)
    public Page<LivroDTO> findAll(Pageable pageable) {
        Page<Livro> result = livroRepository.findAll(pageable);
        return result.map(x -> new LivroDTO(x));
    }

    @Transactional(readOnly = true)
    public LivroByIdDTO findById(Long id) {
        Livro entity = livroRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Livro não encontrado"));

        return new LivroByIdDTO(entity);
    }

    @Transactional
    public LivroResponseDTO insert(LivroRequestDTO dto) {
        Livro entity = new Livro();
        copyDtoToEntity(dto, entity);
        entity = livroRepository.save(entity);
        return new LivroResponseDTO(entity);
    }

    @Transactional
    public LivroResponseDTO update(Long id, LivroRequestDTO dto) {
        try {
            Livro entity = livroRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = livroRepository.save(entity);
            return new LivroResponseDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Livro não encontrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if (!livroRepository.existsById(id)) {
            throw new ResourceNotFoundException("Livro não encontrado");
        }

        try {
            livroRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade referencial");
        }
    }

    public Page<LivroDTO> searchByTitulo(String titulo, Pageable pageable) {
        Page<LivroProjection> result = livroRepository.searchByTitulo(titulo, pageable);
        Page<LivroDTO> dto = result.map(LivroDTO::new);

        return dto;
    }

    private void copyDtoToEntity(LivroRequestDTO dto, Livro entity) {
        entity.setTitulo(dto.getTitulo());
        entity.setAutor(dto.getAutor());
        entity.setIsbn(dto.getIsbn());
        entity.setData_publicacao(dto.getData_publicacao());
        entity.setCategoria(dto.getCategoria());
    }
}

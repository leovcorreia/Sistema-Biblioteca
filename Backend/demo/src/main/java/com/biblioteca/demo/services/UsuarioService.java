package com.biblioteca.demo.services;

import com.biblioteca.demo.dto.livros.LivroRecomendationDTO;
import com.biblioteca.demo.dto.usuarios.UsuarioByIdDTO;
import com.biblioteca.demo.dto.usuarios.UsuarioDTO;
import com.biblioteca.demo.dto.usuarios.UsuarioRequestDTO;
import com.biblioteca.demo.dto.usuarios.UsuarioResponseDTO;
import com.biblioteca.demo.entities.Livro;
import com.biblioteca.demo.entities.Usuario;
import com.biblioteca.demo.repositories.EmprestimoRepository;
import com.biblioteca.demo.repositories.LivroRepository;
import com.biblioteca.demo.repositories.UsuarioRepository;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private LivroService livroService;

    @Autowired
    private EmprestimoService emprestimoService;

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Transactional(readOnly = true)
    public Page<UsuarioDTO> findAll(Pageable pageable) {
        Page<Usuario> result = usuarioRepository.findAll(pageable);

        return result.map(x -> new UsuarioDTO(x));
    }

    @Transactional(readOnly = true)
    public UsuarioByIdDTO findById(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Usuario não encontrado")
        );

        return new UsuarioByIdDTO(usuario);
    }

    @Transactional
    public UsuarioResponseDTO insert(UsuarioRequestDTO dto) {
        Usuario entity = new Usuario();

        copyDtoToEntity(dto, entity);

        entity.setData_cadastro(LocalDateTime.now());

        entity = usuarioRepository.save(entity);

        return new UsuarioResponseDTO(entity);
    }

    @Transactional
    public UsuarioResponseDTO update(Long id, UsuarioRequestDTO dto) {
        try {
            Usuario entity = usuarioRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = usuarioRepository.save(entity);
            return new UsuarioResponseDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Recurso não encontrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Recurso não encontrado");
        }

        try {
            usuarioRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade referencial");
        }
    }

    public Page<LivroRecomendationDTO> recomendarLivros(
            Long usuario_id,
            Pageable pageable) {

        List<String> categorias =
                emprestimoRepository.findCategoriasEmprestadas(usuario_id);

        if (categorias.isEmpty()) {
            return Page.empty(pageable);
        }

        Page<Livro> livros =
                livroRepository.findLivrosRecomendados(
                        usuario_id,
                        categorias,
                        pageable);


        return livros.map(LivroRecomendationDTO::new);
    }

    public void copyDtoToEntity(UsuarioRequestDTO dto, Usuario entity) {
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setTelefone(dto.getTelefone());
    }

}

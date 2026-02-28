package com.biblioteca.demo.services;

import com.biblioteca.demo.dto.emprestimo.EmprestimoRequestDTO;
import com.biblioteca.demo.dto.emprestimo.EmprestimoResponseDTO;
import com.biblioteca.demo.dto.emprestimo.EmprestimoUpdateDTO;
import com.biblioteca.demo.entities.Emprestimo;
import com.biblioteca.demo.entities.Livro;
import com.biblioteca.demo.entities.Usuario;
import com.biblioteca.demo.repositories.EmprestimoRepository;
import com.biblioteca.demo.repositories.LivroRepository;
import com.biblioteca.demo.repositories.UsuarioRepository;
import com.biblioteca.demo.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Transactional(readOnly = true)
    public Page<EmprestimoResponseDTO> findAll(Pageable pageable) {
        return emprestimoRepository.findAll(pageable)
                .map(EmprestimoResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public EmprestimoResponseDTO findById(Long id) {
        Emprestimo entity = emprestimoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empréstimo não encontrado"));

        return new EmprestimoResponseDTO(entity);
    }

    @Transactional
    public EmprestimoResponseDTO insert(EmprestimoRequestDTO dto) {

        Emprestimo entity = new Emprestimo();

        Usuario usuario = usuarioRepository.findById(dto.getUsuario_id())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        Livro livro = livroRepository.findById(dto.getLivro_id())
                .orElseThrow(() -> new ResourceNotFoundException("Livro não encontrado"));

        entity.setUsuario(usuario);
        entity.setLivro(livro);
        entity.setData_emprestimo(dto.getData_emprestimo());
        entity.setData_devolucao(dto.getData_devolucao());
        entity.setStatus(dto.getStatus());

        entity = emprestimoRepository.save(entity);

        return new EmprestimoResponseDTO(entity);
    }

    public EmprestimoResponseDTO atualizar(Long id, EmprestimoUpdateDTO dto) {

        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));

        if (dto.getStatus() != null) {
            emprestimo.setStatus(dto.getStatus());
        }

        if (dto.getData_devolucao() != null) {
            emprestimo.setData_devolucao(dto.getData_devolucao());
        }

        emprestimo = emprestimoRepository.save(emprestimo);

        return new EmprestimoResponseDTO(emprestimo);
    }

    /*
    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if (!emprestimoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empréstimo não encontrado");
        }
        emprestimoRepository.deleteById(id);
    }
     */
}

package com.biblioteca.demo.controllers;

import com.biblioteca.demo.dto.emprestimo.EmprestimoRequestDTO;
import com.biblioteca.demo.dto.emprestimo.EmprestimoResponseDTO;
import com.biblioteca.demo.dto.emprestimo.EmprestimoUpdateDTO;
import com.biblioteca.demo.entities.Emprestimo;
import com.biblioteca.demo.services.EmprestimoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping
    public ResponseEntity<Page<EmprestimoResponseDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(emprestimoService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmprestimoResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(emprestimoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<EmprestimoResponseDTO> insert(
            @Valid @RequestBody EmprestimoRequestDTO dto) {

        EmprestimoResponseDTO response = emprestimoService.insert(dto);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.getId())
                .toUri();

        return ResponseEntity.created(uri).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmprestimoResponseDTO> atualizarEmprestimo(
            @PathVariable Long id,
            @RequestBody EmprestimoUpdateDTO dto) {

        EmprestimoResponseDTO emprestimoAtualizado = emprestimoService.atualizar(id, dto);
        return ResponseEntity.ok(emprestimoAtualizado);
    }

    /*
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        emprestimoService.delete(id);
        return ResponseEntity.noContent().build();
    }
     */
}

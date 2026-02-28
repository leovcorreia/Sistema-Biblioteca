package com.biblioteca.demo.controllers;

import com.biblioteca.demo.dto.livros.*;
import com.biblioteca.demo.services.LivroService;
import com.biblioteca.demo.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/livros")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<Page<LivroDTO>> findAll(Pageable pageable) {
        Page<LivroDTO> dto = livroService.findAll(pageable);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroByIdDTO> findById(@PathVariable Long id) {
        LivroByIdDTO dto = livroService.findById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<LivroResponseDTO> insert(
            @Valid @RequestBody LivroRequestDTO dto) {

        LivroResponseDTO response = livroService.insert(dto);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.getId())
                .toUri();

        return ResponseEntity.created(uri).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LivroResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody LivroRequestDTO dto) {

        LivroResponseDTO response = livroService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        livroService.delete(id);
        return ResponseEntity.noContent().build();
    }

}

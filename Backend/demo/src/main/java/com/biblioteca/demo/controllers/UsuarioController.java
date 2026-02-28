package com.biblioteca.demo.controllers;

import com.biblioteca.demo.dto.livros.LivroRecomendationDTO;
import com.biblioteca.demo.dto.usuarios.UsuarioByIdDTO;
import com.biblioteca.demo.dto.usuarios.UsuarioDTO;
import com.biblioteca.demo.dto.usuarios.UsuarioRequestDTO;
import com.biblioteca.demo.dto.usuarios.UsuarioResponseDTO;
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
@RequestMapping(value = "/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<Page<UsuarioDTO>> findAll(Pageable pageable) {

        Page<UsuarioDTO> dto = usuarioService.findAll(pageable);

        return ResponseEntity.ok(dto);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UsuarioByIdDTO> findById(@PathVariable Long id) {

        UsuarioByIdDTO dto = usuarioService.findById(id);

        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> insert (@Valid @RequestBody UsuarioRequestDTO dto) {
        UsuarioResponseDTO dtoResponse = usuarioService.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dtoResponse.getId()).toUri();
        return ResponseEntity.created(uri).body(dtoResponse);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UsuarioResponseDTO> update (@PathVariable Long id, @Valid @RequestBody UsuarioRequestDTO dto) {
        UsuarioResponseDTO dtoResponse = usuarioService.update(id, dto);
        return ResponseEntity.ok(dtoResponse);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/recomendacoes")
    public ResponseEntity<Page<LivroRecomendationDTO>> recomendarLivros(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<LivroRecomendationDTO> recomendacoes =
                usuarioService.recomendarLivros(id, pageable);

        return ResponseEntity.ok(recomendacoes);
    }

}

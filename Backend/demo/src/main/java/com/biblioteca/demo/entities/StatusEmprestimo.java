package com.biblioteca.demo.entities;

public enum StatusEmprestimo {

    ATIVO,
    DEVOLVIDO,
    ATRASADO;

    public boolean isAtivo() {
        return this == ATIVO;
    }

}

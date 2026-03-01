import type { BaseQueryParams } from "./query-params";

export type UsuarioDTO = {
    id: number;
    nome: string;
    email: string;
    data_cadastro: string;
    telefone: string;
}

export type UsuarioCreateUpdateDTO = {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
};

export type UsuarioQueryParams = BaseQueryParams & {
  username?: string;
};
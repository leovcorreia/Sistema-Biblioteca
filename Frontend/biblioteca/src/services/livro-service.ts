import { type AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import type { UsuarioCreateUpdateDTO, UsuarioQueryParams } from "../models/usuario";
import type { LivroDTO } from "../models/livro";

export function findPageRequest(params: UsuarioQueryParams) {

    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/livros",
        params: {
            page: params.page ?? 0,
            size: params.size ?? 6,
            sort: params.sort ?? "id,desc"
        }
    };

    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url: `/livros/${id}` });
}

export function updateRequest(obj: LivroDTO) {
    return requestBackend({
        method: "PUT",
        url: `/livros/${obj.id}`,
        data: obj
    });
}

export function insertRequest(obj: LivroDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/livros",
        data: obj
    }

    return requestBackend(config);
}

export function deleteRequest(id: number) {
  return requestBackend({
    method: "DELETE",
    url: `/livros/${id}`,
  });
}
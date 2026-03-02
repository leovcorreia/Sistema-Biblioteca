import { type AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import type { UsuarioCreateUpdateDTO, UsuarioQueryParams } from "../models/usuario";

export function findPageRequest(params: UsuarioQueryParams) {

    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/usuarios",
        params: {
            page: params.page ?? 0,
            size: params.size ?? 6,
            sort: params.sort ?? "id,desc",
            nome: params.nome || undefined
        }
    };

    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url: `/usuarios/${id}` });
}

export function updateRequest(obj: UsuarioCreateUpdateDTO) {
    return requestBackend({
        method: "PUT",
        url: `/usuarios/${obj.id}`,
        data: obj
    });
}

export function insertRequest(obj: UsuarioCreateUpdateDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/usuarios",
        data: obj
    }

    return requestBackend(config);
}

export function deleteRequest(id: number) {
  return requestBackend({
    method: "DELETE",
    url: `/usuarios/${id}`,
  });
}
import { type AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import type { UsuarioQueryParams } from "../models/usuario";
import type { EmprestimoDTO } from "../models/emprestimo";

export function findPageRequest(params: UsuarioQueryParams) {

    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/emprestimos",
        params: {
            page: params.page ?? 0,
            size: params.size ?? 6,
            sort: params.sort ?? "id,desc"
        }
    };

    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url: `/emprestimos/${id}` });
}

export function updateRequest(obj: EmprestimoDTO) {
    return requestBackend({
        method: "PUT",
        url: `/emprestimos/${obj.id}`,
        data: obj
    });
}

export function insertRequest(obj: EmprestimoDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/emprestimos",
        data: obj
    }

    return requestBackend(config);
}

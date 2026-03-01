import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EmprestimoDTO } from "../../../models/emprestimo";
import type { UsuarioQueryParams } from "../../../models/usuario";
import * as emprestimoService from "../../../services/emprestimo-service";
import ButtonNew from "../../../components/ButtonNew";
import editIcon from "../../../assets/edit.svg";
import ButtonNextPage from "../../../components/ButtonNextPage";

export default function Emprestimo() {

    const navigate = useNavigate();

    const [isLastPage, setIsLastPage] = useState(false);

    const [loans, setLoans] = useState<EmprestimoDTO[]>([]);

    const [queryParams, setQueryParams] = useState<UsuarioQueryParams>({
        page: 0,
        size: 6,
        sort: "id,desc"
    });

    useEffect(() => {
        emprestimoService.findPageRequest(queryParams)
            .then(response => {
                const nextPage = response.data.content;

                if (queryParams.page === 0) {
                    setLoans(nextPage);
                } else {
                    setLoans(prev => [...prev, ...nextPage]);
                }

                setIsLastPage(response.data.last);
            });
    }, [queryParams]);

    function handleNewClick() {
        navigate("/cruds/emprestimos/create");
    }

    function handleNextPageClick() {
        setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }

    function handleUpdateClick(emprestimoId: number) {
        navigate(`/cruds/emprestimos/${emprestimoId}`);
    }

    return (
        <main>
            <section className="smv-container">

                <h2 className="smv-section-title smv-mb20">
                    Cadastro de Empréstimos
                </h2>

                <div className="smv-btn-page-container smv-mb20">
                    <div onClick={handleNewClick}>
                        <ButtonNew text="Novo" />
                    </div>
                </div>

                <table className="smv-table smv-mb20 smv-mt20">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuário ID</th>
                            <th>Livro ID</th>
                            <th>Data Empréstimo</th>
                            <th>Data Devolução</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map(loan => (
                            <tr key={loan.id}>
                                <td>{loan.id}</td>
                                <td>{loan.usuario_id}</td>
                                <td>{loan.livro_id}</td>
                                <td>{loan.data_emprestimo}</td>
                                <td>{loan.data_devolucao}</td>
                                <td>{loan.status}</td>
                                <td>
                                    <img
                                        onClick={() => handleUpdateClick(loan.id)}
                                        className="smv-client-listing-btn"
                                        src={editIcon}
                                        alt="Editar"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!isLastPage &&
                    <div onClick={handleNextPageClick}>
                        <ButtonNextPage />
                    </div>
                }

            </section>
        </main>
    );
}
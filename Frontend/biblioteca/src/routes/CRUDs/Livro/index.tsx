import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LivroDTO } from "../../../models/livro";
import type { UsuarioQueryParams } from "../../../models/usuario";
import * as livroService from "../../../services/livro-service";
import ButtonNew from "../../../components/ButtonNew";
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.png';
import ButtonNextPage from "../../../components/ButtonNextPage";

export default function Livro() {

    const navigate = useNavigate();

    const [isLastPage, setIsLastPage] = useState(false);
    
    const [books, setBooks] = useState<LivroDTO[]>([]);

    const [queryParams, setQueryParams] = useState<UsuarioQueryParams>({
        page: 0,
        size: 6,
        sort: "id,desc"
    }); 

    useEffect(() => {
        livroService.findPageRequest(queryParams)
            .then(response => {
            const nextPage = response.data.content;

            if (queryParams.page === 0) {
                setBooks(nextPage); 
            } else {
                setBooks(prev => [...prev, ...nextPage]); 
            }

            setIsLastPage(response.data.last);
            });
    }, [queryParams]);

    function handleNewBookClick() {
        navigate("/cruds/livros/create");
    }

    function handleNexPageClick() {
        setQueryParams({...queryParams, page: queryParams.page + 1});
    }

    function handleUpdateClick(livroId: number) {
        navigate(`/cruds/livros/${livroId}`);
    }

    function handleDeleteClick(id: number) {
  if (!window.confirm("Deseja realmente excluir este livro?")) {
    return;
  }

  livroService.deleteRequest(id)
    .then(() => {
      setBooks(books.filter(livro => livro.id !== id));
    })
    .catch(() => {
      alert("Erro ao deletar livro");
    });
}

    return (
        <main>
            <section id="user-listing-section" className="smv-container">
 
                <h2 className="smv-section-title smv-mb20">Cadastro de Livros</h2>

                <div className="smv-btn-page-container smv-mb20">
                    <div onClick={handleNewBookClick}>
                        <ButtonNew text="Novo" />
                    </div>
                </div>

                <table className="smv-table smv-mb20 smv-mt20">
                    <thead>
                        <tr> {/* table row */}
                        <th>ID</th> {/* table header (coluna) */}
                        <th>Título</th> 
                        <th>Autor</th>
                        <th>ISBN</th>
                        <th>Data de publicação</th>
                        <th>Categoria</th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        books.map(books => (
                            <tr key={books.id}> {/* table row */}
                                <td>{books.id}</td> {/* table data (coluna) */}
                                <td>{books.titulo}</td>
                                <td>{books.autor}</td>
                                <td>{books.isbn}</td>
                                <td>{books.data_publicacao}</td>
                                <td>{books.categoria}</td>
                                <td><img onClick={
                                    () => handleUpdateClick(books.id)} className="smv-client-listing-btn" src={editIcon} alt="Editar" /></td>
                                <td><img onClick={() => handleDeleteClick(books.id)} className="smv-client-listing-btn" src={deleteIcon} alt="Deletar" /></td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>

            {
                    !isLastPage &&
                    <div onClick={handleNexPageClick}>
                        <ButtonNextPage />
                    </div>
                }
                
            </section>
        </main>
    );
    
}
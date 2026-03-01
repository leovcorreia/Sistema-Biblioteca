import './styles.css'
import { useEffect, useState } from "react";
import ButtonNew from '../../../components/ButtonNew';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.png';
import ButtonNextPage from '../../../components/ButtonNextPage';
import * as usuarioService from '../../../services/usuario-service';
import { useNavigate } from 'react-router-dom';
import type { UsuarioDTO, UsuarioQueryParams } from '../../../models/usuario';

export default function Usuario() {

    const navigate = useNavigate();

    const [isLastPage, setIsLastPage] = useState(false);
    
    const [users, setUsers] = useState<UsuarioDTO[]>([]);

    const [queryParams, setQueryParams] = useState<UsuarioQueryParams>({
        page: 0,
        size: 6,
        sort: "id,desc"
    }); 

    useEffect(() => {
        usuarioService.findPageRequest(queryParams)
            .then(response => {
            const nextPage = response.data.content;

            if (queryParams.page === 0) {
                setUsers(nextPage); 
            } else {
                setUsers(prev => [...prev, ...nextPage]); 
            }

            setIsLastPage(response.data.last);
            });
    }, [queryParams]);

    function handleNewUserClick() {
        navigate("/cruds/usuarios/create");
    }

    function handleNexPageClick() {
        setQueryParams({...queryParams, page: queryParams.page + 1});
    }

    function handleUpdateClick(usuarioId: number) {
        navigate(`/cruds/usuarios/${usuarioId}`);
    }

    function handleDeleteClick(id: number) {
  if (!window.confirm("Deseja realmente excluir este usuário?")) {
    return;
  }

  usuarioService.deleteRequest(id)
    .then(() => {
      setUsers(users.filter(user => user.id !== id));
    })
    .catch(() => {
      alert("Erro ao deletar usuário");
    });
}

    return (
        <main>
            <section id="user-listing-section" className="smv-container">
 
                <h2 className="smv-section-title smv-mb20">Cadastro de Usuários</h2>

                <div className="smv-btn-page-container smv-mb20">
                    <div onClick={handleNewUserClick}>
                        <ButtonNew text="Novo" />
                    </div>
                </div>

                <table className="smv-table smv-mb20 smv-mt20">
                    <thead>
                        <tr> {/* table row */}
                        <th>ID</th> {/* table header (coluna) */}
                        <th>Nome</th> 
                        <th>Email</th>
                        <th>Data de cadastro</th>
                        <th>Telefone</th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}> {/* table row */}
                                <td>{user.id}</td> {/* table data (coluna) */}
                                <td>{user.nome}</td>
                                <td>{user.email}</td>
                                <td>{user.data_cadastro}</td>
                                <td>{user.telefone}</td>
                                <td><img onClick={() => handleUpdateClick(user.id)} className="smv-client-listing-btn" src={editIcon} alt="Editar" /></td>
                                <td><img onClick={() => handleDeleteClick(user.id)} className="smv-client-listing-btn" src={deleteIcon} alt="Deletar" /></td>
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
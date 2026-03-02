import { useEffect, useState } from "react";
import * as livroService from "../../services/livro-service";
import ButtonNextPage from "../../components/ButtonNextPage";
import UserSearchModal from "../../components/UserSearchModal";
import type { LivroDTO } from "../../models/livro";
import type { UsuarioDTO } from "../../models/usuario";
import "./styles.css";

export default function Recomendacao() {

  const [selectedUser, setSelectedUser] = useState<UsuarioDTO | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const [books, setBooks] = useState<LivroDTO[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!selectedUser) return;

    livroService
      .findRecomendacoes(selectedUser.id, page)
      .then(response => {
        const nextPage = response.data.content;

        if (page === 0) {
          setBooks(nextPage);
        } else {
          setBooks(prev => [...prev, ...nextPage]);
        }

        setIsLastPage(response.data.last);
      });
  }, [selectedUser, page]);

  function handleUserSelect(user: UsuarioDTO) {
    setSelectedUser(user);
    setBooks([]);
    setPage(0);
  }

  function handleNextPage() {
    setPage(prev => prev + 1);
  }

  return (
    <main>
      <section className="smv-container">

        <h2 className="smv-section-title smv-mb20">
          Sistema de Recomendação de Livros
        </h2>

        <div className="smv-item-section">

          <button
            className="smv-client-add-btn"
            onClick={() => setShowUserModal(true)}
          >
            Selecionar Usuário
          </button>

          {selectedUser && (
            <p style={{ marginTop: 10 }}>
              Usuário selecionado: <strong>{selectedUser.nome}</strong>
            </p>
          )}

        </div>

        {showUserModal && (
          <UserSearchModal
            onClose={() => setShowUserModal(false)}
            onSelect={handleUserSelect}
          />
        )}

        {selectedUser && (
          <>
            <table className="smv-table smv-mb20 smv-mt20">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Categoria</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.titulo}</td>
                    <td>{book.autor}</td>
                    <td>{book.categoria}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!isLastPage &&
              <div onClick={handleNextPage}>
                <ButtonNextPage />
              </div>
            }
          </>
        )}

      </section>
    </main>
  );
}
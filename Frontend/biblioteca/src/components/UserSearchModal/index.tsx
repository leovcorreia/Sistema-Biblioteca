import { useState } from "react";
import * as usuarioService from "../../services/usuario-service";
import type { UsuarioDTO } from "../../models/usuario";

type Props = {
  onClose: () => void;
  onSelect: (user: UsuarioDTO) => void;
};

export default function UserSearchModal({ onClose, onSelect }: Props) {

  const [nome, setNome] = useState("");
  const [users, setUsers] = useState<UsuarioDTO[]>([]);

  function handleSearch() {
    if (!nome.trim()) return;

    usuarioService.findPageRequest({
      page: 0,
      nome
    })
      .then(response => {
        setUsers(response.data.content);
      })
      .catch(() => setUsers([]));
  }

  return (
    <div className="smv-modal">
      <div className="smv-modal-content">

        <div className="smv-modal-content-search">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do usuário"
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        {users.length > 0 && (
          <ul className="smv-item-list">
            {users.map(u => (
              <li
                key={u.id}
                onClick={() => {
                  onSelect(u);
                  onClose();
                }}
                style={{ cursor: "pointer" }}
              >
                Nome: <strong> {u.nome} — ID {u.id}</strong>
              </li>
            ))}
          </ul>
        )}

        <button onClick={onClose}>Fechar</button>

      </div>
    </div>
  );
}
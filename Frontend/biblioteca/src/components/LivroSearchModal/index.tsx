import { useState } from "react";
import * as livroService from "../../services/livro-service";
import type { LivroDTO } from "../../models/livro";

type Props = {
  onClose: () => void;
  onSelect: (livro: LivroDTO) => void;
};

export default function LivroSearchModal({ onClose, onSelect }: Props) {

  const [titulo, setTitulo] = useState("");
  const [livros, setLivros] = useState<LivroDTO[]>([]);

  function handleSearch() {
    if (!titulo.trim()) return;

    livroService.findPageRequest({
      page: 0,
      titulo
    })
      .then(response => {
        setLivros(response.data.content);
      })
      .catch(() => setLivros([]));
  }

  return (
    <div className="smv-modal">
      <div className="smv-modal-content">

        <div className="smv-modal-content-search">
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título do livro"
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        {livros.length > 0 && (
          <ul className="smv-item-list">
            {livros.map(l => (
              <li
                key={l.id}
                onClick={() => {
                  onSelect(l);
                  onClose();
                }}
                style={{ cursor: "pointer" }}
              >
                <strong> {l.titulo} — ID {l.id}</strong>
              </li>
            ))}
          </ul>
        )}

        <button onClick={onClose}>Fechar</button>

      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as emprestimoService from "../../../../services/emprestimo-service";
import * as forms from "../../../../utils/forms";
import FormInput from "../../../../components/FormInput";
import type { UsuarioDTO } from "../../../../models/usuario";
import type { LivroDTO } from "../../../../models/livro";
import LivroSearchModal from "../../../../components/LivroSearchModal";
import UserSearchModal from "../../../../components/UserSearchModal";
import "./styles.css";

export default function EmprestimoForm() {

  const params = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [showUserModal, setShowUserModal] = useState(false);
  const [showLivroModal, setShowLivroModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UsuarioDTO | null>(null);
  const [selectedLivro, setSelectedLivro] = useState<LivroDTO | null>(null);

  const isCreating = params.emprestimoId === "create";
  const isEditing = !isCreating;

  const [formData, setFormData] = useState({
    usuario_id: { value: "", id: "usuario_id", name: "usuario_id", type: "number", placeholder: "ID do Usuário" },
    livro_id: { value: "", id: "livro_id", name: "livro_id", type: "number", placeholder: "ID do Livro" },
    data_emprestimo: { value: "", id: "data_emprestimo", name: "data_emprestimo", type: "date", placeholder: "Data do Empréstimo" },
    data_devolucao: { value: "", id: "data_devolucao", name: "data_devolucao", type: "date", placeholder: "Data de Devolução" },
    status: { value: "", id: "status", name: "status", type: "text", placeholder: "Status" },
  });

  // Carrega empréstimo se for edição
  useEffect(() => {
    if (isEditing) {
      emprestimoService.findById(Number(params.emprestimoId))
        .then((res) => {
          const e = res.data;

          setFormData(prev => forms.updateAll(prev, {
            usuario_id: e.usuario_id,
            livro_id: e.livro_id,
            data_emprestimo: e.data_emprestimo?.substring(0, 10),
            data_devolucao: e.data_devolucao?.substring(0, 10),
            status: e.status,
          }));
        })
        .catch(() => setErrorMessage("Erro ao carregar empréstimo."));
    }
  }, [isEditing, params.emprestimoId]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      let value = event.target.value;
  
      if (event.target.name === "status") {
        value = value.toUpperCase();
      }
  
      const result = forms.updateAndValidate(formData, event.target.name, value);
      setFormData(result);
  
    }

    function handleUserSelect(user: UsuarioDTO) {
        setSelectedUser(user);

        // atualiza o form
        setFormData(prev => ({
            ...prev,
            usuario_id: {
            ...prev.usuario_id,
            value: String(user.id)
            }
        }));
    }  

    function handleLivroSelect(livro: LivroDTO) {
        setSelectedLivro(livro);

        setFormData(prev => ({
            ...prev,
            livro_id: {
            ...prev.livro_id,
            value: String(livro.id)
            }
        }));

    }

  function handleTurnDirty(name: string) {
    setFormData(prev => forms.dirtyAndValidate(prev, name));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");

    const validated = forms.dirtyAndValidateAll(formData);
    if (forms.hasAnyInvalid(validated)) {
      setFormData(validated);
      return;
    }

    const values = forms.toValues(formData);

    const requestBody = {
        usuario_id: Number(values.usuario_id),
        livro_id: Number(values.livro_id),
        data_emprestimo: values.data_emprestimo,
        data_devolucao: values.data_devolucao,
        status: values.status,
    };

    const request = isEditing
        ? emprestimoService.updateRequest(requestBody)
        : emprestimoService.insertRequest(requestBody);

    request
      .then(() => navigate("/cruds/emprestimos"))
      .catch((error) => {
        const newInputs = forms.setBackendErrors(
          formData,
          error.response?.data?.errors || []
        );
        setFormData(newInputs);
        setErrorMessage(
          error.response?.data?.message || "Erro ao salvar empréstimo."
        );
      });
  }

  return (
    <main>
      <section id="emprestimo-form-section" className="smv-container">
        <div className="smv-client-form-container">
          <form className="smv-card smv-form" onSubmit={handleSubmit}>

            <h2>DADOS DO EMPRÉSTIMO</h2>

            <div className="smv-form-group">

                <div className="smv-search-field">
                    <input
                    className="smv-form-control"
                    value={selectedUser ? selectedUser.nome : ""}
                    placeholder="Selecione um usuário"
                    readOnly
                    />

                    <button
                    type="button"
                    className="smv-client-add-btn"
                    onClick={() => setShowUserModal(true)}
                    disabled={isEditing}
                    >
                    🔍
                    </button>
                </div>

            </div>

            <div className="smv-form-group">

                <div className="smv-search-field">
                    <input
                    className="smv-form-control"
                    value={selectedLivro ? selectedLivro.titulo : ""}
                    placeholder="Selecione um livro"
                    readOnly
                    />

                    <button
                    type="button"
                    className="smv-client-add-btn"
                    onClick={() => setShowLivroModal(true)}
                    disabled={isEditing}
                    >
                    🔍
                    </button>
                </div>

            </div>

            <label htmlFor="">Data de empréstimo</label>
            <FormInput {...formData.data_emprestimo} className="smv-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} readOnly={isEditing} />
            <label htmlFor="">Data de devolução</label>
            <FormInput {...formData.data_devolucao} className="smv-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
            <FormInput {...formData.status} className="smv-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />

            {errorMessage && (
              <div className="smv-form-error">{errorMessage}</div>
            )}

            <div className="smv-vehicle-form-buttons smv-mt20">
              <Link to="/cruds/emprestimos">
                <button
                  type="button"
                  className="smv-btn smv-btn-white smv-btn-white-extra"
                >
                  Cancelar
                </button>
              </Link>

              <button type="submit" className="smv-btn smv-btn-blue">
                {isEditing ? "Salvar alterações" : "Salvar"}
              </button>
            </div>

          </form>

            {showUserModal && (
                <UserSearchModal
                    onClose={() => setShowUserModal(false)}
                    onSelect={handleUserSelect}
                />
            )}

            {showLivroModal && (
                <LivroSearchModal
                    onClose={() => setShowLivroModal(false)}
                    onSelect={handleLivroSelect}
                />
            )}

        </div>
      </section>
    </main>
  );
}
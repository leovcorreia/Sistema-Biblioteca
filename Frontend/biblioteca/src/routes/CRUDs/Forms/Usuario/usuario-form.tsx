import './styles.css';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as forms from '../../../../utils/forms';
import FormInput from '../../../../components/FormInput';
import * as usuarioService from '../../../../services/usuario-service';
import type { UsuarioCreateUpdateDTO } from '../../../../models/usuario';

export default function UsuarioForm() {
    const params = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const isCreating = params.usuarioId === "create";
  const isEditing = !isCreating;

  const [formData, setFormData] = useState({
    nome: { value: "", id: "nome", name: "nome", type: "text", placeholder: "Nome" },
    email: { value: "", id: "email", name: "email", type: "email", placeholder: "Email" },
    telefone: { value: "", id: "telefone", name: "telefone", type: "text", placeholder: "Telefone" },
  });

  // Carrega usuário se for edição
  useEffect(() => {
    if (isEditing) {
      usuarioService.findById(Number(params.usuarioId))
        .then((res) => {
          const c = res.data;
          setFormData((prev) => forms.updateAll(prev, {
            nome: c.nome,
            email: c.email,
            telefone: c.telefone,
          }));
        })
        .catch(() => setErrorMessage("Erro ao carregar usuário."));
    }
  }, [isEditing, params.usuarioId]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => forms.updateAndValidate(prev, name, value));
  }

  function handleTurnDirty(name: string) {
    setFormData((prev) => forms.dirtyAndValidate(prev, name));
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
    const requestBody: UsuarioCreateUpdateDTO = {
        id: isEditing ? Number(params.usuarioId) : undefined,
        nome: values.nome,
        email: values.email,
        telefone: values.telefone,
    };

    const request = isEditing
      ? usuarioService.updateRequest(requestBody)
      : usuarioService.insertRequest(requestBody);

    request
      .then(() => navigate("/cruds/usuarios"))
      .catch((error) => {
        const newInputs = forms.setBackendErrors(formData, error.response?.data?.errors || []);
        setFormData(newInputs);
        setErrorMessage(error.response?.data?.message || "Erro ao salvar usuário.");
      });
  }

  return (
    <main>
      <section id="user-form-section" className="smv-container">
        <div className="smv-client-form-container">
          <form className="smv-card smv-form" onSubmit={handleSubmit}>
            <h2>DADOS DO USUÁRIO</h2>

            <FormInput {...formData.nome} className="smv-form-control smv-user" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
            <FormInput {...formData.email} className="smv-form-control smv-user" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
            <FormInput {...formData.telefone} className="smv-form-control smv-user" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />

            {errorMessage && <div className="smv-form-error">{errorMessage}</div>}

            <div className="smv-vehicle-form-buttons smv-mt20">
              <Link to="/cruds/usuarios">
                <button type="button" className="smv-btn smv-btn-white smv-btn-white-extra">Cancelar</button>
              </Link>
              <button type="submit" className="smv-btn smv-btn-blue">
                {isEditing ? "Salvar alterações" : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

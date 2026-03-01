import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as livroService from "../../../../services/livro-service";
import * as forms from '../../../../utils/forms';
import FormInput from '../../../../components/FormInput';

export default function LivroForm() {

  const params = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const isCreating = params.livroId === "create";
  const isEditing = !isCreating;

  const [formData, setFormData] = useState({
    titulo: { value: "", id: "titulo", name: "titulo", type: "text", placeholder: "Título" },
    autor: { value: "", id: "autor", name: "autor", type: "text", placeholder: "Autor" },
    isbn: { value: "", id: "isbn", name: "isbn", type: "text", placeholder: "ISBN" },
    data_publicacao: { value: "", id: "data_publicacao", name: "data_publicacao", type: "date", placeholder: "Data de Publicação" },
    categoria: { value: "", id: "categoria", name: "categoria", type: "text", placeholder: "Categoria" },
  });

  // 🔹 Carrega livro se for edição
  useEffect(() => {
    if (isEditing) {
      livroService.findById(Number(params.livroId))
        .then((res) => {
          const l = res.data;

          setFormData(prev => forms.updateAll(prev, {
            titulo: l.titulo,
            autor: l.autor,
            isbn: l.isbn,
            data_publicacao: l.data_publicacao,
            categoria: l.categoria,
          }));
        })
        .catch(() => setErrorMessage("Erro ao carregar livro."));
    }
  }, [isEditing, params.livroId]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;

    if (event.target.name === "categoria") {
      value = value.toUpperCase();
    }

    const result = forms.updateAndValidate(formData, event.target.name, value);
    setFormData(result);

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
      id: isEditing ? Number(params.livroId) : undefined,
      titulo: values.titulo,
      autor: values.autor,
      isbn: values.isbn,
      data_publicacao: values.data_publicacao,
      categoria: values.categoria,
    };

    const request = isEditing
      ? livroService.updateRequest(requestBody)
      : livroService.insertRequest(requestBody);

    request
      .then(() => navigate("/cruds/livros"))
      .catch((error) => {
        const newInputs = forms.setBackendErrors(
          formData,
          error.response?.data?.errors || []
        );
        setFormData(newInputs);
        setErrorMessage(
          error.response?.data?.message || "Erro ao salvar livro."
        );
      });
  }

  return (
    <main>
      <section id="livro-form-section" className="smv-container">
        <div className="smv-client-form-container">
          <form className="smv-card smv-form" onSubmit={handleSubmit}>

            <h2>DADOS DO LIVRO</h2>

            <FormInput {...formData.titulo} className="smv-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
            <FormInput {...formData.autor} className="smv-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
            <FormInput {...formData.isbn} className="smv-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
            <FormInput {...formData.data_publicacao} className="smv-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
            <FormInput {...formData.categoria} className="smv-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />

            {errorMessage && (
              <div className="smv-form-error">{errorMessage}</div>
            )}

            <div className="smv-vehicle-form-buttons smv-mt20">
              <Link to="/cruds/livros">
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
        </div>
      </section>
    </main>
  );
}
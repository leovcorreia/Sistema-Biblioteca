import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './routes/Home';
import Cruds from './routes/CRUDs/index.tsx';
import Usuario from './routes/CRUDs/Usuario/index.tsx';
import UsuarioForm from './routes/CRUDs/Forms/Usuario/usuario-form.tsx';
import Livro from './routes/CRUDs/Livro/index.tsx';
import LivroForm from './routes/CRUDs/Forms/Livro/livro-form.tsx';
import Emprestimo from './routes/CRUDs/Emprestimo/index.tsx';
import EmprestimoForm from './routes/CRUDs/Forms/Emprestimo/emprestimo-form.tsx';
import Recomendacao from './routes/Recomendacao/index.tsx';
/*import GoogleBooks from './routes/GoogleBooks/index.tsx';*/

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="cruds" element={<Cruds />} />

        <Route path="cruds/usuarios" element={<Usuario />} />
            <Route path="cruds/usuarios/:usuarioId" element={<UsuarioForm />} />
        <Route path="cruds/livros" element={<Livro />} />
            <Route path="cruds/livros/:livroId" element={<LivroForm />} />
        <Route path="cruds/emprestimos" element={<Emprestimo />} />
            <Route path="cruds/emprestimos/:emprestimoId" element={<EmprestimoForm />} />
        <Route path="/recomendacao" element={<Recomendacao />} />

        {/*<Route path="/google-books" element={<GoogleBooks />} /> */}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
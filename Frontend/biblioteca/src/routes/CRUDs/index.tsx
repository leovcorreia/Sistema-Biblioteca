import HomeCard from "../../components/HomeCard";

export default function Cruds() {

    return (
        <section className="smv-home-container">
            <h2>Tela de CRUDs</h2>
            <div className="smv-home-content mt-20">
                 <div className="smv-home-row-top">
                    <HomeCard 
                        title="Usuários" 
                        path="cruds/usuarios" 
                    />
                    <HomeCard 
                        title="Livros" 
                        path="cruds/livros" 
                    />
                     <HomeCard 
                        title="Empréstimos" 
                        path="cruds/emprestimos" 
                    />
                </div>

            </div>
        </section>
    );

}
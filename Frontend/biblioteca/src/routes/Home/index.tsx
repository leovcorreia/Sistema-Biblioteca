import HomeCard from "../../components/HomeCard";
import "./styles.css";

export default function Home() {

    return (
        <section className="smv-home-container">
            <h2>Gestão de Biblioteca com Recomendação de Livros</h2>
            <div className="smv-home-row">
                <HomeCard title="CRUDs" path="cruds" />
                <HomeCard title="Recomendação de Livros" path="recomendacao" />
                <HomeCard title="Google Books" path="google-books" />
            </div>
        </section>
    );

}
import HomeCard from "../../components/HomeCard";

export default function Home() {

    return (
        <section className="smv-home-container">
            <div className="smv-home-content mt-20">
                 <div className="smv-home-row-top">
                    <HomeCard 
                        title="CRUDs" 
                        path="cruds" 
                    />
                    <HomeCard 
                        title="Recomendação de livros" 
                        path="recomendacao" 
                    />
                     <HomeCard 
                        title="Google Books" 
                        path="google-books" 
                    />
                </div>

            </div>
        </section>
    );

}
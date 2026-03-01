import { Link } from "react-router-dom";
import "./styles.css";

type Props = {
    title: string;
    path: string;
    onClick?: () => void;
}

export default function HomeCard( { title, path, onClick }: Props) {

    return (
        <Link to={`/${path}`} >
            <div className="home-card" onClick={onClick}>
                <h2>{title}</h2>
            </div>
        </Link>
        
    );
}
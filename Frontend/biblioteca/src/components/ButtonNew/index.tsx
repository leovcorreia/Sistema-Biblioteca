import './styles.css';
import addImg from '../../assets/add.svg';

type Props = {
    text?: string;
}

export default function ButtonNew( { text }: Props ) {

    return (
        <div className="smv-btn-new">
            <div className="smv-btn-new-left"> 
                <img src={addImg} alt="Adição" /> 
            </div>
            <div className="smv-btn-new-right">
                {text}
            </div>
        </div>
    );
}
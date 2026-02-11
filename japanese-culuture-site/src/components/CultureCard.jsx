import { Link } from 'react-router-dom';

function CultureCard({ id, title, description }) {
    return (    
        <div className="culture-card">
            <h3>
                <Link to={`/culture/${id}`}>{title}</Link>
            </h3>
            <p>{description}</p>
        </div>
    );
}   

export default CultureCard;
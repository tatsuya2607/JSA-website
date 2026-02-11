import { Link } from 'react-router-dom';

function CultureCard({ id, title, description, image }) {
    return (
        <div className="culture-card">
            <h3>
                <Link to={`/culture/${id}`}>
                    <img src={image} alt={title} className="card-image" />
                    <h3>{title}</h3>
                </Link>
            </h3>
            <p>{description}</p>
        </div>
    );
}

export default CultureCard;
import { Link } from 'react-router-dom';

function CultureCard({ id, title, description, image }) {
    return (
        <div className="culture-card">
            <h3>
                <Link to={`/culture/${id}`}>
                    {/* alt shows if the image fails to load, and also helps with accessibility */}
                    <img src={image} alt={title} className="card-image" />
                    <h3 className="title-card">{title}</h3>
                </Link>
                    <p className="description-card">{description}</p>
            </h3>
        </div>
    );
}

export default CultureCard;
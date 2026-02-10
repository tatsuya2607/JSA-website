function CultureCard({ title, description }) {
    return (    
        <div className="culture-card">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}   

export default CultureCard;
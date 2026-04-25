import { useParams } from "react-router-dom";
import { cultureData } from "../data/CultureData";

function CultureDetail() {
    // Get the ID from the URL parameters
    const { id } = useParams();
    // Find the culture item that matches the ID
    const culture = cultureData.find((item) =>
        item.id === parseInt(id)
    );

    if (!culture) {
        return <p>Culture not found.</p>;
    }

    return (
        <main>
            <h1>{culture.title}</h1>
            <p>{culture.description}</p>
        </main>
    );
}

export default CultureDetail;
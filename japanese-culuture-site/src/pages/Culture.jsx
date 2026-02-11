import CultureCard from "../components/CultureCard";
import { cultureData } from "../data/CultureData";

function Culture() {
    return (
        <main>
            <h2>Culture Topics</h2>
            <div className="card-grid">
                {cultureData.map((culture) => (
                    <CultureCard
                        key={culture.id}
                        id={culture.id}
                        title={culture.title}
                        description={culture.description}
                        image={culture.image}
                    />
                ))}
            </div>
        </main>
    );
}

export default Culture;
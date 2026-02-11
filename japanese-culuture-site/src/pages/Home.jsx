import CultureCard from "../components/CultureCard";
import { cultureData } from "../data/cultureData";

function Home() {
    return (
        <main>

            <h2>Welcome to Japanese Culture</h2>


            {cultureData.map((culture) => (
                <CultureCard
                    key={culture.id}
                    id={culture.id}
                    title={culture.title}
                    description={culture.description}
                />
            ))}

        </main>
    );
}

export default Home;

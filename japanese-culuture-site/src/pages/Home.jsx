import CultureCard from "../components/CultureCard";
import { cultureData } from "../data/CultureData";

function Home() {
    return (
        <main>

            <h2>Welcome to Japanese Culture</h2>


            {cultureData.map((culture) => (
                <CultureCard
                    key={culture.id}
                    title={culture.title}
                    description={culture.description}
                />
            ))}

        </main>
    );
}

export default Home;

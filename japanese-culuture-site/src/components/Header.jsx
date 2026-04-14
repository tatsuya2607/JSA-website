import { Link } from 'react-router-dom';
import "../App.css";
import sakura from "../assets/sakura-test.jpg";

function Header() {
  return (
    <header
      className="header"
      style={{ backgroundImage: `url(${sakura})` }}
    >
      <div className="overlay">
        <h1>Japanese Student Association</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/culture">Culture</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
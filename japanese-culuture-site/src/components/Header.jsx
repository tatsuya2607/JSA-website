import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Japanese Culture</h1>
      <nav>
        <Link to="/">Home</Link> | {" "}
        <Link to="/culture"> Culture</Link>
      </nav>
    </header>
  );
}

export default Header;
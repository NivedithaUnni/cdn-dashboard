import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2><span className="green"></span>CDN</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/geo">Geo</Link>
      </div>
    </nav>
  );
}
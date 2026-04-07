import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/bg2.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // 🔥 Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // trigger after scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleNavigation = (id) => {
    if (location.pathname !== "/home") {
      navigate("/home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "transparent" : ""}`}>
       <h2 className="logo-container">
        <img src={logo} alt="logo" className="logo-img" />
        CDN
      </h2>

      <div className="nav-links">
        <span onClick={() => handleNavigation("hero")}>Home</span>
        <span onClick={() => handleNavigation("dashboard")}>Dashboard</span>
        <span onClick={() => handleNavigation("videos")}>Videos</span>
        <span onClick={() => handleNavigation("geo")}>Geo</span>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}
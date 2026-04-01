import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";

export default function Hero() {
  const nav = useNavigate();
  const [bgImage, setBgImage] = useState(bg1); // default desktop

  // Update background based on screen width
  useEffect(() => {
    const updateBg = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setBgImage(null); // small mobile - no background
      } else if (width <= 768) {
        setBgImage(null); // mobile - no background
      } else if (width <= 1024) {
        setBgImage(bg1); // tablet
      } else {
        setBgImage(bg1); // desktop
      }
    };

    updateBg(); // initial
    window.addEventListener("resize", updateBg);
    return () => window.removeEventListener("resize", updateBg);
  }, []);

  return (
    <div
      className="hero"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
      }}
    >
      {/* MOVING IMAGE */}
      <div className="moving-container">
        <div className="rotate-wrapper">
          <img src={bg2} className="hero-move-img" alt="cdn" />
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="hero-content">
        <h1>
          <span className="green">CDN</span> — Intelligent Video Analytics Platform
        </h1>

        <p className="hero-sub">
          Real-time streaming insights, advanced analytics, and performance monitoring 
          to optimize your global content delivery network.
        </p>

        <p className="hero-desc">
          Track viewer engagement, analyze bandwidth usage, monitor streaming errors, 
          and visualize geographic distribution — all in one powerful dashboard.
        </p>

        <div className="hero-buttons">
          <button className="btn primary">View Dashboard</button>
          <button className="btn secondary">Explore Analytics</button>
        </div>
      </div>
    </div>
  );
}
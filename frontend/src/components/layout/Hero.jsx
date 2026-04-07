import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";

export default function Hero() {
  const nav = useNavigate();
  const [bgImage, setBgImage] = useState(bg1);

  useEffect(() => {
    const updateBg = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setBgImage(null); // remove bg for mobile
      } else {
        setBgImage(bg1);
      }
    };

    updateBg();
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
      {/* ROTATING IMAGE */}
      <div className="moving-container">
        <div className="rotate-wrapper">
          <img src={bg2} className="hero-move-img" alt="cdn" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="hero-content">
        <h1>
          <span className="green">CDN</span> — Intelligent Video Analytics Platform
        </h1>

        <p className="hero-sub">
          Real-time streaming insights, advanced analytics, and performance monitoring
        </p>

        <p className="hero-desc">
          Track viewer engagement, bandwidth usage, streaming errors, and geo distribution.
        </p>

       <div className="hero-buttons">
  <button
    className="btn primary"
    onClick={() => {
      nav("/home");
      setTimeout(() => {
        document.getElementById("dashboard")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }}
  >
    View Dashboard
  </button>

  <button
    className="btn secondary"
    onClick={() => {
      nav("/home");
      setTimeout(() => {
        document.getElementById("videos")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }}
  >
    Explore Analytics
  </button>
</div>
      </div>
    </div>
  );
}
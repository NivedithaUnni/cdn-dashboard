import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Dashboard from "../pages/Dashboard/Dashboard";
import Videos from "../pages/Videos/Videos";
import Geo from "../pages/Geo/Geo";

// Component to scroll to section on route change
function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.pathname.replace("/", "") || "hero";
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return null;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToSection />

      {/* All sections rendered on the same page */}
      <section id="hero">
        <Hero />
      </section>

      <section id="dashboard">
        <Dashboard />
      </section>

      <section id="videos">
        <Videos />
      </section>

      <section id="geo">
        <Geo />
      </section>

      {/* Define routes for URL navigation */}
      <Routes>
        <Route path="/" />
        <Route path="/dashboard" />
        <Route path="/videos" />
        <Route path="/geo" />
      </Routes>
    </BrowserRouter>
  );
}
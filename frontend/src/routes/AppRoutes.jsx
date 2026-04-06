import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Login from "../pages/Login";
import Hero from "../components/layout/Hero";
import Dashboard from "../pages/Dashboard/Dashboard";
import Videos from "../pages/Videos/Videos";
import Geo from "../pages/Geo/Geo";
import PrivateRoute from "../components/PrivateRoute";

//  Same layout
function MainPage() {
  return (
    <>
      <Navbar />

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
    </>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Protected */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
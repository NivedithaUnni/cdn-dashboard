// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Redirect if token already exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, [navigate]);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser({ email, password });

      // Save JWT token to localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to /home
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-container">
      <div className="login-card">

        {/* LEFT: Login Form */}
        <div className="login-left">
          <div className="login-content">
            <h2>CDN Dashboard</h2>
            <p className="subtitle">Login to your account</p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>

        {/* RIGHT: Info Panel */}
        <div className="login-right">
          <div className="overlay">
            <h3>CDN Analytics Platform</h3>
            <p>
              Monitor traffic, bandwidth, and performance in real-time.
              Manage your streaming infrastructure with ease.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <h3>CDN Dashboard</h3>
          <p>Real-time analytics & global content delivery insights.</p>
        </div>

      

        {/* RIGHT */}
        <div className="footer-right">
          <p>© {new Date().getFullYear()} CDN. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
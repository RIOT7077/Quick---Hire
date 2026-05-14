import React from "react";
import { Link } from "react-router";

const linkStyle = {
  color: "#444",
  textDecoration: "none",
  fontWeight: "500",
  transition: "color 0.3s ease",
  cursor: "pointer",
};

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        color: "#444",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "14px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontWeight: "700",
            fontSize: "1.5rem",
            background: "linear-gradient(to right, #3b82f6, #9333ea)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Quick Hire
        </h2>
        <nav style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <a href="/" style={linkStyle}>
            Home
          </a>
          <a href="/about" style={linkStyle}>
            About
          </a>
          <a href="/contact" style={linkStyle}>
            Contact
          </a>
          <Link to={"/PrivacyPolicy"} style={linkStyle}>
            Privacy Policy
          </Link>
        </nav>
      </div>
      <div
        style={{
          borderTop: "1px solid #ddd",
          width: "100%",
          maxWidth: "1200px",
          paddingTop: "15px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, color: "#666" }}>
          © {new Date().getFullYear()} Quick Hire. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

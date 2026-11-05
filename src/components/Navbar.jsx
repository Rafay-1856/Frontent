import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">CricSher</Link>
      <div>
        <Link to="/">Home</Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/shop">Shop</Link>
        {user ? (
          <>
            <Link to="/register-team">Register Team</Link>
            <Link to="/chat">Chat</Link>
            <button onClick={logout} className="btn" style={{ marginLeft: 12, padding: "6px 12px", fontSize: 13 }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

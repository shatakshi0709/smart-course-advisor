import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "./auth";
import "./style.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    const result = signup(email, password);
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="app-shell">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join us to get your perfect course path.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-wrap auth-input-wrap">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrap auth-input-wrap">
            <input
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <button type="submit" className="gradient-btn auth-btn">
            Sign Up
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

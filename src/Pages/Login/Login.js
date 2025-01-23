import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file
import logo from '../../logo-exemplifi.svg';

const Login = () => {
  const navigate = useNavigate();
  
  // State to manage input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login clicked");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const navigateToForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <div>
            <img src={logo} alt="logo" />
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              required
            />
          </div>
          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <button
              type="button"
              onClick={navigateToForgotPassword}
              className="forgot-password"
            >
              Forgot your password?
            </button>
          </div>
          <button type="submit" className="login-button">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

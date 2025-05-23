import React, { useState } from "react";
import { API_URL } from "../../utilities/ApiPath";
import "./Login.css";
import loginGif from "./login.gif";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const loginResponse = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(
          loginData.message ||
            `Login failed: ${loginResponse.status} ${loginResponse.statusText}`
        );
      }

      localStorage.setItem("loginToken", loginData.token);
      const vendorId = loginData.vendorId;
      localStorage.setItem("vendorId", vendorId);
      setEmail("");
      setPassword("");

      try {
        const vendorResponse = await fetch(`${API_URL}/vendor/vendorById/${vendorId}`);
        const vendorData = await vendorResponse.json();

        if (!vendorResponse.ok) {
          throw new Error(
            vendorData.message ||
              `Failed to fetch vendor details: ${vendorResponse.status}`
          );
        }

        const firm = vendorData?.vendor?.firm?.[0];
        if (firm?.firmName && firm?._id) {
          localStorage.setItem("firmId", firm._id);
          localStorage.setItem("firmName", firm.firmName);
        } else {
          // Firm not created yet, allow login to proceed
          localStorage.setItem("firmId", "");
          localStorage.setItem("firmName", "");
        }

        showWelcomeHandler();
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } catch (vendorErr) {
        throw new Error(`Error fetching vendor details: ${vendorErr.message}`);
      }
    } catch (err) {
      setError(
        err.message || "An error occurred. Please check your network or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      <h3>
        Vendor Login{" "}
        <img src={loginGif} alt="Login animation" className="loginGif" />
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
        />

        <label htmlFor="password">Password</label>
        <div className="passwordContainer">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
          <span className="showPassword" onClick={handleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="submit-btn-container">
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

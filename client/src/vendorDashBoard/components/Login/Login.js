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

  // Client-side validation
  if (!validateEmail(email)) {
    setError("Please enter a valid email address.");
    setLoading(false);
    return;
  }

  try {
    // Login API call
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

    // Store token and reset form
    localStorage.setItem("loginToken", loginData.token);
    setEmail("");
    setPassword("");

    // Check for vendorId
    const vendorId = loginData.vendorId;
    if (!vendorId) {
      throw new Error("Vendor ID not found in login response.");
    }

    // Fetch vendor details
    try {
      const vendorResponse = await fetch(
        `${API_URL}/vendor/vendorById/${vendorId}`
      );
      const vendorData = await vendorResponse.json();
      console.log(vendorData);

      if (!vendorResponse.ok) {
        throw new Error(
          vendorData.message ||
            `Failed to fetch vendor details: ${vendorResponse.status}`
        );
      }

      // Extract firm details from vendor.firm[0]
      const vendorFirm = vendorData?.vendor?.firm?.[0]; 
      if (!vendorFirm || !vendorFirm._id || !vendorFirm.firmName) {
        throw new Error("Vendor firm details not found.");
      }

      const vendorFirmId = vendorFirm._id; 
      const vendorFirmName = vendorFirm.firmName;

      // Store firm details
      localStorage.setItem("firmId", vendorFirmId);
      localStorage.setItem("firmName", vendorFirmName);

      // Trigger welcome handler
      showWelcomeHandler();
      window.location.reload();
    } catch (vendorError) {
      throw new Error(`Error fetching vendor details: ${vendorError.message}`);
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
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // console.log('Success:', data);
        alert("Vendor login success!");
        localStorage.setItem("loginToken", data.token); //used to assign name to the key in the local storage and token from the backend is stored in the frontend
        setEmail("");
        setPassword("");
        showWelcomeHandler();
      } else {
        console.error("API error:", data, "Status:", response.status);
        setError(
          data.message ||
            `Login failed: ${response.status} ${response.statusText}`
        );
      }
      const id = data.vendorId;
      console.log("Checking for the firm Id :", id);
      const vendorResponse = await fetch(`${API_URL}/vendor/vendorById/${id}`);
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        console.log("Firm name",vendorFirmName);
        localStorage.setItem("firmId", vendorFirmId);
        localStorage.setItem("firmName", vendorFirmName);
        window.location.reload(); //to refresh
      }
    } catch (err) {
      console.error("Login error:", err, err.message);
      setError(
        `An error occurred: ${err.message}. Please check your network or try again.`
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
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
        />
        <span className='showPassword'
              onClick={handleShowPassword}
              >{showPassword ? 'Hide' : 'Show'}</span>
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

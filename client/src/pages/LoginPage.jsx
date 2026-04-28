import React, { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });
  }, []);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle login
 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );

    console.log("✅ Login Success:", res.data);

    const data = res.data;

    // 🔥 SAVE DATA 
    if (data.token && data.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // 🔥 FIX
      

      console.log("💾 Saved User:", data.user);

      alert("Login successful ✅");

      navigate("/dashboard");
    } else {
      alert("Invalid response from server ❌");
    }

  } catch (error) {
    console.log("❌ ERROR:", error);

    if (error.response) {
      alert(error.response.data.message || "Login failed ❌");
    } else {
      alert("Server not responding ❌");
    }
  }
 };
  

  return (
    <div className="flex h-screen bg-gray-100">

      {/* LEFT */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <img
          src={logo}
          alt="AI"
          className="w-72 h-72 object-cover rounded-2xl shadow-lg"
        />

        <div className="flex items-center gap-2 mt-4 text-blue-600">
          <span className="text-2xl">🧠</span>
          <h1 className="text-xl font-bold font-serif">
            AI Study Assistant
          </h1>
        </div>

        <p className="text-gray-500 text-center max-w-sm mt-2">
          Enhance your learning journey with AI-powered insights
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex justify-center items-center">

        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="bg-white p-8 rounded-2xl shadow-lg w-[400px]"
        >
          <h2 className="text-3xl font-semibold mb-2">Login</h2>
          <p className="text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>

          {/* Email */}
          <div className="mb-4 relative">
            <label className="text-sm font-medium">Email</label>
            <Mail className="absolute left-3 top-10 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 pl-10 pr-3 py-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="text-sm font-medium">Password</label>
            <Lock className="absolute left-3 top-10 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full mt-1 pl-10 pr-3 py-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            Sign in
          </button>

          {/* Signup */}
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>

        </form>

      </div>
    </div>
  );
};

export default LoginPage;
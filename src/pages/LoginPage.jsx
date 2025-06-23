import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../components/AuthLayout";
import axios from "axios";

export const LoginPage = () => {
  const navigate = useNavigate();

const handleLogin = async (formData) => {
  try {
    const adminRes = await axios.post("http://localhost:5050/api/auth/admin/login", formData);
    if (adminRes.data.success) {
      console.log("Admin logged in");

      // ✅ Store token
      localStorage.setItem("token", adminRes.data.token);

      return navigate("/admin/dashboard");
    }
  } catch (adminError) {
    console.log("Not an admin, trying donor login...");
  }

  try {
    const donorRes = await axios.post("http://localhost:5050/api/auth/login", formData);
    if (donorRes.data.success) {
      console.log("Donor logged in");

      // ✅ Store token
      localStorage.setItem("token", donorRes.data.token);

      return navigate("/dashboard");
    } else {
      alert(donorRes.data.message || "Invalid credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please check your credentials.");
  }
};

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <LoginForm onLogin={handleLogin} />
      </div>
    </AuthLayout>
  );
};

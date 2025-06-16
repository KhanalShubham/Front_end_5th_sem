import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../components/authlayout";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("donor");

  return (
    // <div className="min-h-screen flex">
    //   {/* Left side */}
    //   <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        
    // </div>

    <AuthLayout >
      <div className="w-full max-w-md">
          <div className="animate-fadeInUp">
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setLoginType("donor")}
                className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors bg-white text-gray-900 shadow-sm"
              >
                Donor Login
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/login")}
                className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900"
              >
                Admin Portal
              </button>
            </div>

            <LoginForm />
          </div>
        </div>
      
    </AuthLayout>
  );
};

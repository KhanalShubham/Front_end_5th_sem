"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import Input from "../components/ui/Input"
import PasswordInput from "../components/ui/PassowrdInput"
import Checkbox from "../components/ui/Checkbox"
import Button from "../components/buttons"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [rememberMe, setRememberMe] = useState(false)
  const [loginType, setLoginType] = useState("donor") // 'donor' or 'admin'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Form submitted:", formData, "Type:", loginType)
      if (loginType === "admin") {
        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard"
      } else {
        // Redirect to donor dashboard
        window.location.href = "/dashboard"
      }
    }
  }

  return (
    <AuthLayout image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8oqACkcStUBNLaOVjo9qiNaswl1DGc.png">
      <div className="animate-fadeInUp">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{loginType === "admin" ? "Admin Portal" : "Sign in"}</h1>
        </div>

        <p className="text-gray-600 mb-6">
          {loginType === "admin"
            ? "Access the administrative dashboard"
            : "Sign up for free to access to all of our products"}
        </p>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setLoginType("donor")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginType === "donor" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Donor Login
          </button>
          <button
            type="button"
            onClick={() => setLoginType("admin")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginType === "admin" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Admin Portal
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />

          <div className="flex items-center justify-between mt-4">
            <Checkbox
              id="remember-me"
              label="Remember me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />

            <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" size="large" className="w-full mt-6 bg-green-600 hover:bg-green-700">
            Sign in
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default LoginPage

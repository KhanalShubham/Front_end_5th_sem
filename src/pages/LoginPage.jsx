"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Shield } from "lucide-react"
import Input from "../components/ui/Input"
import PasswordInput from "../components/ui/PasswordInput"
import Checkbox from "../components/ui/Checkbox"
import Button from "../components/Button"

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

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

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
        window.location.href = "/admin/dashboard"
      } else {
        window.location.href = "/dashboard"
      }
    }
  }

  // Admin Portal Layout
  if (loginType === "admin") {
    return (
      <div className="min-h-screen flex bg-gray-900">
        {/* Left side - Admin Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-900">
          <div className="w-full max-w-md">
            <div className="animate-fadeInUp">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="text-white h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
                  <p className="text-red-400">Secure Administrative Access</p>
                </div>
              </div>

              <div className="flex mb-6 bg-gray-800 rounded-lg p-1 border border-gray-700">
                <button
                  type="button"
                  onClick={() => setLoginType("donor")}
                  className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors text-gray-400 hover:text-white"
                >
                  Donor Login
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType("admin")}
                  className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors bg-red-600 text-white shadow-sm"
                >
                  Admin Portal
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Admin Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="admin@hopecare.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your admin password"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-800"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>

                  <Link to="/forgot-password" className="text-sm text-red-400 hover:text-red-300">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Access Admin Portal
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">Authorized personnel only. All access is monitored and logged.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Admin Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-gray-900"></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8oqACkcStUBNLaOVjo9qiNaswl1DGc.png"
            alt="Admin Portal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Shield className="h-24 w-24 mx-auto mb-4 text-red-400" />
              <h2 className="text-4xl font-bold mb-2">Secure Access</h2>
              <p className="text-xl text-gray-300">Administrative Control Panel</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Regular Donor Login Layout
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="animate-fadeInUp">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
            </div>

            <p className="text-gray-600 mb-6">Sign up for free to access to all of our products</p>

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
                onClick={() => setLoginType("admin")}
                className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900"
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

              <Button
                type="submit"
                variant="primary"
                size="large"
                className="w-full mt-6 bg-green-600 hover:bg-green-700"
              >
                Sign in
              </Button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-green-500">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8oqACkcStUBNLaOVjo9qiNaswl1DGc.png"
          alt="Hope Connect"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import AuthLayout from "../authlayout"
import Input from "../ui/Input"
import PasswordInput from "../ui/PassowrdInput"
import Checkbox from "../ui/checkbox"
import Button from "../buttons"
import baby from '../../assets/images/baby.png'
import { Eye, EyeOff } from "lucide-react"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [rememberMe, setRememberMe] = useState(false)

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
      // Submit form data
      console.log("Form submitted:", formData)
      // Here you would typically make an API call to authenticate the user
    }
  }

  return (
    <AuthLayout image={baby}>
      <div className="animate-fadeInUp">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
        </div>

        <p className="text-gray-600 mb-6">Sign up for free to access to all of our products</p>

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

export default LoginForm

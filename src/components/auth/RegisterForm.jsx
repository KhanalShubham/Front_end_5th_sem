"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import AuthLayout from "../components/authlayout"
import Input from "../components/ui/Input"
import PasswordInput from "../components/ui/PassowrdInput"
import Checkbox from "../components/ui/checkbox"
import Button from "../components/buttons"
import baby from '../assets/images/baby.png'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [receiveEmails, setReceiveEmails] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

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

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else {
      const passwordRegex = {
        length: /.{8,}/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        number: /[0-9]/,
      }

      if (!passwordRegex.length.test(formData.password)) {
        newErrors.password = "Password must be at least 8 characters"
      } else if (!passwordRegex.uppercase.test(formData.password)) {
        newErrors.password = "Password must contain an uppercase letter"
      } else if (!passwordRegex.lowercase.test(formData.password)) {
        newErrors.password = "Password must contain a lowercase letter"
      } else if (!passwordRegex.special.test(formData.password)) {
        newErrors.password = "Password must contain a special character"
      } else if (!passwordRegex.number.test(formData.password)) {
        newErrors.password = "Password must contain a number"
      }
    }

    // Terms validation
    if (!agreeTerms) {
      newErrors.terms = "You must agree to the Terms of Use and Privacy Policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Submit form data
      console.log("Form submitted:", formData)
      // Here you would typically make an API call to register the user
    }
  }

  return (
    <AuthLayout image={baby}>
      <div className="animate-fadeInUp">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Hope Connect</h1>
        </div>

        <p className="text-gray-600 mb-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
            Log in
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />

          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            error={errors.username}
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
            showRequirements={true}
          />

          <div className="mt-6 space-y-4">
            <Checkbox
              id="receive-emails"
              label="I want to receive emails about the product, feature updates, events, and marketing promotions."
              checked={receiveEmails}
              onChange={() => setReceiveEmails(!receiveEmails)}
            />

            <Checkbox
              id="agree-terms"
              label={
                <span>
                  By creating an account, you agree to the{" "}
                  <Link to="/terms" className="text-green-600 hover:text-green-700">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-green-600 hover:text-green-700">
                    Privacy Policy
                  </Link>
                  .
                </span>
              }
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className={errors.terms ? "border-red-500" : ""}
            />
            {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}
          </div>

          <Button type="submit" variant="primary" size="large" className="w-full mt-6 bg-green-600 hover:bg-green-700">
            Create an account
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default RegisterForm

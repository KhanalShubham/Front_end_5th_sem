"use client";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "../AuthLayout";
import { useRegisterUserTan } from "../../hooks/useRegisterUserTan";
import { Heart, Mail, User, Lock, ArrowRight, Sparkles, CheckCircle } from "lucide-react"

const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending}= useRegisterUserTan();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      receiveEmails: false,
      agreeTerms: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, "Password must contain a special character")
        .matches(/[0-9]/, "Password must contain a number")
        .required("Password is required"),
      receiveEmails: Yup.boolean(),
      agreeTerms: Yup.boolean().oneOf(
        [true],
        "You must agree to the Terms of Use and Privacy Policy"
      ),
    }),
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => navigate("/login"),
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message || error.message || "Registration failed";
          if (errorMessage.includes("already exists")) {
            formik.setErrors({ email: "Email or username already exists" });
          } else {
            formik.setErrors({ general: errorMessage });
          }
        },
      });
    },
  });
    const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formik.values.password)

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        {/* Floating Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-24 right-12 w-8 h-8 bg-gradient-to-br from-teal-200 to-green-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-16 left-16 w-12 h-12 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full opacity-25 animate-pulse delay-1000"></div>

        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl shadow-xl mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
            <Heart className="w-8 h-8 text-white fill-current relative z-10" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" />
            </div>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
            Join Hope Care
          </h1>
          <p className="text-gray-500 text-base font-light">Start your journey of making a difference</p>

          {/* Decorative line */}
          <div className="flex items-center justify-center mt-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mx-3"></div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
          </div>
        </div>

        {/* Error Message */}
        {formik.errors.general && (
          <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
              <span className="text-red-700 text-sm font-medium">{formik.errors.general}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail
                  className={`h-4 w-4 transition-colors duration-200 ${
                    formik.touched.email && formik.errors.email
                      ? "text-red-400"
                      : "text-gray-400 group-focus-within:text-green-500"
                  }`}
                />
              </div>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email address"
                className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-green-400 focus:ring-green-100 hover:border-gray-300"
                } focus:ring-4 focus:ring-opacity-20 focus:outline-none text-gray-900 placeholder-gray-400`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="flex items-center space-x-1 text-red-600 text-xs mt-1 animate-in slide-in-from-top-1 duration-200">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                <span>{formik.errors.email}</span>
              </div>
            )}
          </div>

          {/* Username Field */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User
                  className={`h-4 w-4 transition-colors duration-200 ${
                    formik.touched.username && formik.errors.username
                      ? "text-red-400"
                      : "text-gray-400 group-focus-within:text-green-500"
                  }`}
                />
              </div>
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Choose a username"
                className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-green-400 focus:ring-green-100 hover:border-gray-300"
                } focus:ring-4 focus:ring-opacity-20 focus:outline-none text-gray-900 placeholder-gray-400`}
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <div className="flex items-center space-x-1 text-red-600 text-xs mt-1 animate-in slide-in-from-top-1 duration-200">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                <span>{formik.errors.username}</span>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock
                  className={`h-4 w-4 transition-colors duration-200 ${
                    formik.touched.password && formik.errors.password
                      ? "text-red-400"
                      : "text-gray-400 group-focus-within:text-green-500"
                  }`}
                />
              </div>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Create a secure password"
                className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-green-400 focus:ring-green-100 hover:border-gray-300"
                } focus:ring-4 focus:ring-opacity-20 focus:outline-none text-gray-900 placeholder-gray-400`}
              />
            </div>

            {/* Password Strength Indicator */}
            {formik.values.password && (
              <div className="mt-2">
                <div className="flex space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        level <= passwordStrength
                          ? passwordStrength <= 2
                            ? "bg-red-400"
                            : passwordStrength <= 3
                              ? "bg-yellow-400"
                              : "bg-green-400"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Password strength:{" "}
                  <span
                    className={
                      passwordStrength <= 2
                        ? "text-red-600"
                        : passwordStrength <= 3
                          ? "text-yellow-600"
                          : "text-green-600"
                    }
                  >
                    {passwordStrength <= 2 ? "Weak" : passwordStrength <= 3 ? "Medium" : "Strong"}
                  </span>
                </p>
              </div>
            )}

            {formik.touched.password && formik.errors.password && (
              <div className="flex items-center space-x-1 text-red-600 text-xs mt-1 animate-in slide-in-from-top-1 duration-200">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                <span>{formik.errors.password}</span>
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 pt-2">
            {/* Receive Emails Checkbox */}
            <label className="flex items-start space-x-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  name="receiveEmails"
                  checked={formik.values.receiveEmails}
                  onChange={formik.handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-md border-2 transition-all duration-200 ${
                    formik.values.receiveEmails
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300 group-hover:border-green-400"
                  }`}
                >
                  {formik.values.receiveEmails && (
                    <svg
                      className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-600 leading-relaxed">
                I want to receive emails about product updates, events, and marketing promotions.
              </span>
            </label>

            {/* Terms Agreement Checkbox */}
            <label className="flex items-start space-x-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formik.values.agreeTerms}
                  onChange={formik.handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-md border-2 transition-all duration-200 ${
                    formik.values.agreeTerms
                      ? "bg-green-500 border-green-500"
                      : formik.touched.agreeTerms && formik.errors.agreeTerms
                        ? "border-red-300"
                        : "border-gray-300 group-hover:border-green-400"
                  }`}
                >
                  {formik.values.agreeTerms && (
                    <svg
                      className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-600 leading-relaxed">
                By creating an account, you agree to the{" "}
                <Link to="/terms" className="text-green-600 hover:text-green-700 font-medium underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-green-600 hover:text-green-700 font-medium underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {formik.touched.agreeTerms && formik.errors.agreeTerms && (
              <div className="flex items-center space-x-1 text-red-600 text-xs mt-1 animate-in slide-in-from-top-1 duration-200">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                <span>{formik.errors.agreeTerms}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">{isPending ? "Creating account..." : "Create Account"}</span>
            {!isPending && (
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
            )}
            {isPending && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-4 mt-6 pt-4">
          <div className="flex items-center space-x-1 text-gray-400">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <span className="text-xs font-medium">Secure</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
            <span className="text-xs font-medium">Trusted</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            <span className="text-xs font-medium">Private</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}


export default RegisterForm;
"use client";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminLogin } from "../../api/admin/authApi";
import { useLoginUserTan } from "../../hooks/useLoginUserTan";
import { toast } from "react-hot-toast";
import { Heart, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLoginUserTan();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Attempt admin login silently via API module
        const adminRes = await adminLogin({
          username: values.email,
          password: values.password,
        });

        if (adminRes.data.success) {
          toast.success(adminRes.data.message || "Admin login successful");

          const { token } = adminRes.data;
          const storage = values.rememberMe ? localStorage : sessionStorage;

          storage.setItem("token", token);
          storage.setItem("user", JSON.stringify({ role: "admin" }));

          return navigate("/admin/dashboard");
        }
      } catch (adminError) {
        // If admin login fails, fall through to donor login
      }

      // Now proceed with donor login mutation
      mutate(values, {
        onSuccess: (res) => {
          toast.success(res.message || "Login successful");

          const { token, data } = res;
          const storage = values.rememberMe ? localStorage : sessionStorage;

          storage.setItem("token", token);
          storage.setItem("user", JSON.stringify(data));

          if (data?.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message || error.message || "Login failed";
          toast.error(errorMessage);

          if (errorMessage.toLowerCase().includes("invalid")) {
            formik.setErrors({ general: "Invalid email or password" });
          } else {
            formik.setErrors({ general: errorMessage });
          }
        },
      });
    },
  });

  return (
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
          Welcome Back
        </h1>
        <p className="text-gray-500 text-base font-light">Continue your journey of making a difference</p>

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
              placeholder="Enter your password"
              className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                formik.touched.password && formik.errors.password
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-green-400 focus:ring-green-100 hover:border-gray-300"
              } focus:ring-4 focus:ring-opacity-20 focus:outline-none text-gray-900 placeholder-gray-400`}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="flex items-center space-x-1 text-red-600 text-xs mt-1 animate-in slide-in-from-top-1 duration-200">
              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
              <span>{formik.errors.password}</span>
            </div>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-md border-2 transition-all duration-200 ${
                  formik.values.rememberMe
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300 group-hover:border-green-400"
                }`}
              >
                {formik.values.rememberMe && (
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
            <span className="text-sm text-gray-600 font-medium">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">{isPending ? "Signing you in..." : "Sign In"}</span>
          {!isPending && (
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
          )}
          {isPending && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-6 pt-4 border-t border-gray-100">
        <p className="text-gray-600 text-sm">
          New to our community?{" "}
          <Link
            to="/signup"
            className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200 hover:underline"
          >
            Join us today
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
  )
}

export default LoginForm;

"use client";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      rememberMe: Yup.boolean(),
    }),
    onSubmit: (values) => {
      if (values.email === "admin@123gmail.com" && values.password === "admin123") {
        if (values.rememberMe) {
          localStorage.setItem("adminToken", "admin-authenticated");
        } else {
          sessionStorage.setItem("adminToken", "admin-authenticated");
        }
        navigate("/admin/dashboard");
      } else {
        formik.setErrors({ general: "Invalid admin credentials" });
      }
    },
  });

  return (
    <div className="animate-fadeInUp">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-2">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-100">Admin Portal</h1>
      </div>

      <p className="text-gray-400 mb-6">Secure access for administrators only</p>

      {formik.errors.general && (
        <div className="text-red-400 text-sm mb-4 p-3 bg-red-900/20 border-red-800 rounded-md border">
          {formik.errors.general}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Admin Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            placeholder="admin@123gmail.com"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-400">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Enter your admin password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-400">{formik.errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="admin-remember-me"
              name="rememberMe"
              type="checkbox"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-800"
            />
            <label htmlFor="admin-remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <Link to="/forgot-password" className="text-sm text-red-400 hover:text-red-300">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          Access Admin Portal
        </button>
      </form>
    </div>
  );
};

export default AdminForm;

"use client";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "../../components/authlayout"
import Input from "../ui/Input";
import PasswordInput from "../ui/PassowrdInput";
import Checkbox from "../ui/Checkbox";
import Button from "../../components/buttons"
import { useLoginUserTan } from "../../hooks/useLoginUserTan";


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
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      rememberMe: Yup.boolean(),
    }),
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (res) => {
          const { token } = res;
          if (values.rememberMe) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }
          navigate("/dashboard");
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message || error.message || "Login failed";
          if (errorMessage.includes("invalid credentials")) {
            formik.setErrors({ general: "Invalid email or password" });
          } else {
            formik.setErrors({ general: errorMessage });
          }
        },
      });
    },
  });

  return (
    <AuthLayout>
      <div className="animate-fadeInUp">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
        </div>

        <p className="text-gray-600 mb-6">Sign in to access your account</p>

        {formik.errors.general && (
          <div className="text-red-500 text-sm mb-4">{formik.errors.general}</div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Email address"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.email && formik.errors.email}
            placeholder="Enter your email"
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.password && formik.errors.password}
            placeholder="Enter your password"
          />

          <div className="flex items-center justify-between mt-4">
            <Checkbox
              id="remember-me"
              name="rememberMe"
              label="Remember me"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
            />

            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:text-green-700"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
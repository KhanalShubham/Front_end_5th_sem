"use client";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "../authlayout";
import Input from "../ui/Input";
import PasswordInput from "../ui/PassowrdInput";
import Checkbox from "../ui/Checkbox";
import Button from "../buttons";
import { useRegisterUserTan } from "../../hooks/useRegisterUserTan";

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

  return (
    <AuthLayout>
      <div className="animate-fadeInUp">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Hope Connect</h1>
        </div>

        {formik.errors.general && (
          <div className="text-red-500 text-sm mb-4">{formik.errors.general}</div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.email && formik.errors.email}
            placeholder="Enter your email"
          />

          <Input
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.username && formik.errors.username}
            placeholder="Enter your username"
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.password && formik.errors.password}
            showRequirements={true}
            placeholder="Enter your password"
          />

          <div className="mt-6 space-y-4">
            <Checkbox
              id="receive-emails"
              name="receiveEmails"
              label="I want to receive emails about the product, feature updates, events, and marketing promotions."
              checked={formik.values.receiveEmails}
              onChange={formik.handleChange}
            />

            <Checkbox
              id="agree-terms"
              name="agreeTerms"
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
              checked={formik.values.agreeTerms}
              onChange={formik.handleChange}
              className={formik.touched.agreeTerms && formik.errors.agreeTerms ? "border-red-500" : ""}
            />
            {formik.touched.agreeTerms && formik.errors.agreeTerms && (
              <p className="text-sm text-red-600">{formik.errors.agreeTerms}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
            disabled={isPending}
          >
            {isPending ? "Creating account..." : "Create an account"}
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
  );
};

export default RegisterForm;
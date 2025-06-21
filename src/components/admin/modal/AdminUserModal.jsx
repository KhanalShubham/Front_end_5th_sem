import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateUser } from "../../../hooks/admin/useAdminUser";
import { X, User, Mail, Lock, Heart, Loader2, UserPlus } from "lucide-react"
import { toast } from "react-hot-toast";

export default function AddUserModal({ isOpen, onClose }) {
  const { mutate, isLoading } = useCreateUser();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6).required("Password is required"),
    }),
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          toast.success("User added successfully");
          formik.resetForm();
          onClose();
        },
        onError: (err) => {
          toast.error(err.message || "Failed to add user");
        },
      });
    },
  });

  if (!isOpen) return null;

  const fieldConfig = [
    { name: "username", icon: User, label: "Username", placeholder: "Enter donor's username" },
    { name: "email", icon: Mail, label: "Email Address", placeholder: "Enter email address", type: "email" },
    { name: "password", icon: Lock, label: "Password", placeholder: "Create a secure password", type: "password" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl min-h-[500px] max-h-[95vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-700 px-8 py-6 text-white relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-1"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-xl">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Add New Donor</h2>
                <p className="text-green-100 text-sm">Welcome a new generous supporter</p>
              </div>
            </div>
            <button
              onClick={() => {
                formik.resetForm()
                onClose()
              }}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-xl transition-all duration-200"
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Heart className="h-5 w-5 text-green-600 fill-current" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Creating Donor Account</p>
                <p className="text-xs text-green-600">This will create a new donor profile in the system</p>
              </div>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {fieldConfig.map((field) => {
              const IconComponent = field.icon
              const hasError = formik.touched[field.name] && formik.errors[field.name]

              return (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor={field.name}>
                    {field.label}
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IconComponent className={`h-5 w-5 ${hasError ? "text-red-400" : "text-gray-400"}`} />
                    </div>

                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[field.name]}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                        hasError
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                      } focus:ring-4 focus:ring-opacity-20 focus:outline-none`}
                    />
                  </div>

                  {hasError && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm mt-2 animate-in slide-in-from-top-1 duration-200">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span>{formik.errors[field.name]}</span>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Additional Info Section */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full mt-1">
                  <UserPlus className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Account Information</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• The donor will receive login credentials via email</li>
                    <li>• They can update their profile after first login</li>
                    <li>• Password must be at least 6 characters long</li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer - Always Visible */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-end space-x-4 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              formik.resetForm()
              onClose()
            }}
            className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-teal-700 text-white font-semibold hover:from-green-700 hover:to-teal-800 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Adding Donor...</span>
              </>
            ) : (
              <>
                <Heart className="h-5 w-5 fill-current" />
                <span>Add Donor</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
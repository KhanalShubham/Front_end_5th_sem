import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreatePatient } from "../../../hooks/admin/useAdminPatient";
import { toast } from "react-hot-toast";

export default function AddPatientModal({ isOpen, onClose }) {
  const { mutate, isLoading } = useCreatePatient();

  const formik = useFormik({
    initialValues: {
      name: "",
      disease: "",
      description: "",
      contact: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      disease: Yup.string().required("Disease is required"),
      description: Yup.string(),
      contact: Yup.string().required("Contact is required"),
      password: Yup.string().min(6).required("Password is required"),
    }),
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          toast.success("Patient added successfully");
          formik.resetForm();  // ✅ Clear fields after adding
          onClose();
        },
        onError: (err) => {
          console.error(err);
          toast.error(err.message || "Failed to add patient");
        },
      });
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {["name", "disease", "description", "contact", "password"].map(
            (field) => (
              <div key={field}>
                <label
                  className="block capitalize font-medium mb-1"
                  htmlFor={field}
                >
                  {field}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field]}
                  className="w-full border rounded px-3 py-2"
                />
                {formik.touched[field] && formik.errors[field] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors[field]}
                  </div>
                )}
              </div>
            )
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                formik.resetForm(); // ✅ Clear if cancel is pressed too
                onClose();
              }}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetOneUser, useUpdateUser } from "../../../hooks/admin/useAdminUser";

export default function EditUserModal({ isOpen, onClose, userId }) {
  const { user, refetch } = useGetOneUser(userId);
  const { mutate, isLoading } = useUpdateUser();

  useEffect(() => {
    if (userId) refetch();
  }, [userId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user?.username || "",
      email: user?.email || ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      mutate(
        { id: userId, data: values },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {["username", "email"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block capitalize font-medium mb-1">
                {field}
              </label>
              <input
                id={field}
                name={field}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field]}
                className="w-full border rounded px-3 py-2"
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="text-red-500 text-sm">{formik.errors[field]}</div>
              )}
            </div>
          ))}


          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
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
              {isLoading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { useDeleteOnePatient } from "../../../hooks/admin/useAdminPatient";

export default function DeletePatientModal({ isOpen, onClose, patientId }) {
  const { mutate, isLoading } = useDeleteOnePatient();

  const handleDelete = () => {
    mutate(patientId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-4">Delete Patient?</h2>
        <p className="mb-6">Are you sure you want to delete this patient?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

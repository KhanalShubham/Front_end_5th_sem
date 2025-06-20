import React, { useState } from "react";
import { useAdminPatient } from "../../hooks/admin/useAdminPatient";
import AddPatientModal from "./modal/AdminPatientModal";
import EditPatientModal from "./modal/EditPatientModal";
import DeletePatientModal from "./modal/DeletePatientModal";
import { Toaster } from "react-hot-toast";

export default function AdminPatient() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const {
    patients,
    isLoading,
    isError,
    pagination,
    setPageNumber,
    canNextPage,
    canPreviousPage,
  } = useAdminPatient();

  if (isLoading) return <div>Loading patients...</div>;
  if (isError) return <div>Error fetching patients...</div>;

  // Handlers
  const openEditModal = (id) => {
    setSelectedPatientId(id);
    setShowEditModal(true);
  };

  const openDeleteModal = (id) => {
    setSelectedPatientId(id);
    setShowDeleteModal(true);
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedPatientId(null);
  };

  return (
    <div className="p-6">
      <Toaster />

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Patient
        </button>
      </div>

      <AddPatientModal isOpen={showAddModal} onClose={closeAllModals} />
      <EditPatientModal
        isOpen={showEditModal}
        onClose={closeAllModals}
        patientId={selectedPatientId}
      />
      <DeletePatientModal
        isOpen={showDeleteModal}
        onClose={closeAllModals}
        patientId={selectedPatientId}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Disease</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Contact</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{patient.name}</td>
                <td className="px-4 py-2 border">{patient.disease}</td>
                <td className="px-4 py-2 border">{patient.description}</td>
                <td className="px-4 py-2 border">{patient.contact}</td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(patient._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(patient._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className="px-3 py-1 bg-gray-200 text-sm rounded disabled:opacity-50"
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={!canPreviousPage}
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          className="px-3 py-1 bg-gray-200 text-sm rounded disabled:opacity-50"
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

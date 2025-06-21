import React, { useState } from "react";
import { useAdminUser } from "../../hooks/admin/useAdminUser";
import AddUserModal from "./modal/AdminUserModal";
import EditUserModal from "./modal/EditUserModal";
import DeleteUserModal from "./modal/DeleteUserModal";
import { Toaster } from "react-hot-toast";
import { Heart, Plus, Edit3, Trash2, Mail, User, Users, Gift, ChevronLeft, ChevronRight, UserCheck, Search } from "lucide-react"

export default function AdminUser() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    users,
    isLoading,
    isError,
    pagination,
    setPageNumber,
    canNextPage,
    canPreviousPage,
  } = useAdminUser();

 if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="text-gray-600 font-medium">Loading donors...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <Heart className="h-16 w-16 mx-auto" />
              </div>
              <p className="text-red-600 font-medium text-lg">Error fetching donors...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const openEditModal = (id) => {
    setSelectedUserId(id);
    setShowEditModal(true);
  };

  const openDeleteModal = (id) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedUserId(null);
  };
    const filteredUsers = users.filter((users) =>
    users.username.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <Toaster />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 p-3 rounded-xl shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Donor Management</h1>
                <p className="text-gray-600 mt-1">Manage and support our generous donors</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Donor
            </button>
          </div>
        </div>

        {/* Modals */}
        <AddUserModal isOpen={showAddModal} onClose={closeAllModals} />
        <EditUserModal isOpen={showEditModal} onClose={closeAllModals} userId={selectedUserId} />
        <DeleteUserModal isOpen={showDeleteModal} onClose={closeAllModals} userId={selectedUserId} />
        {/* Search Bar */}
        <div className="mb-6 flex justify-end">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Donors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-200 rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Donors</p>
                  <p className="text-3xl font-bold text-gray-900">{pagination.totalCount || users.length}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-200 rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Page</p>
                  <p className="text-3xl font-bold text-gray-900">{pagination.page}</p>
                </div>
                <div className="bg-teal-100 p-3 rounded-full">
                  <Gift className="h-6 w-6 text-teal-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-200 rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pages</p>
                  <p className="text-3xl font-bold text-gray-900">{pagination.totalPages}</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 rounded-lg"
            >
              <div className="pb-3 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 p-2 rounded-full">
                      <UserCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{user.username}</h3>
                      <span className="mt-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Donor ID: {user._id.slice(-6)}
                      </span>
                    </div>
                  </div>
                  <div className="text-green-500">
                    <Heart className="h-5 w-5 fill-current" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 px-6 pb-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <User className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Username</p>
                      <p className="text-sm text-gray-600">{user.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-600 break-all">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Gift className="h-4 w-4 text-purple-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Status</p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active Donor</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openEditModal(user._id)}
                    className="flex-1 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(user._id)}
                    className="flex-1 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="bg-white shadow-lg border-0 rounded-lg">
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Heart className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No donors found</h3>
              <p className="text-gray-600 mb-6">Start building your donor community by adding the first donor.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center mx-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Donor
              </button>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {users.length > 0 && (
          <div className="bg-white shadow-lg border-0 rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                  disabled={!canPreviousPage}
                  className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                </div>

                <button
                  onClick={() => setPageNumber((prev) => prev + 1)}
                  disabled={!canNextPage}
                  className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
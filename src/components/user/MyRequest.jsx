"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Plus, FileText, Calendar, DollarSign, Clock, CheckCircle, XCircle, Trash2 } from "lucide-react"
import { useMyRequests, useDeleteRequest } from "../../hooks/useRequest"
import AddRequestModal from "./modal/AddRequest"

export default function MyRequests() {
  const [showAddModal, setShowAddModal] = useState(false)
  const { myRequests, isLoading, error } = useMyRequests()
  const deleteRequestMutation = useDeleteRequest()

  const handleDelete = async (requestId) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await deleteRequestMutation.mutateAsync(requestId)
      } catch (error) {
        console.error("Error deleting request:", error)
      }
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "declined":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "declined":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading your requests...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/user/dashboard" className="p-2 hover:bg-white rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-blue-700 flex items-center space-x-2">
                <FileText className="w-7 h-7" />
                <span>My Requests</span>
              </h1>
              <p className="text-gray-600 mt-1">Manage your medical assistance requests</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </button>
        </div>

        {/* Requests List */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Error loading requests: {error.message}</p>
          </div>
        ) : myRequests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No requests yet</h3>
            <p className="text-gray-500 mb-6">You haven't submitted any medical assistance requests.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Your First Request
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Request Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(request.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{request.description}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />$
                          {Number.parseFloat(request.neededAmount).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    {request.status === "pending" && (
                      <button
                        onClick={() => handleDelete(request._id)}
                        disabled={deleteRequestMutation.isPending}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Request Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Medical Condition</p>
                    <p className="text-sm text-gray-600">{request.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Citizenship Status</p>
                    <p className="text-sm text-gray-600 capitalize">{request.citizen.replace("_", " ")}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Your Story</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{request.inDepthStory}</p>
                </div>

                {/* File Info */}
                {request.filename && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <FileText className="w-4 h-4" />
                    <span>Document: {request.filename}</span>
                  </div>
                )}

                {/* Admin Feedback */}
                {request.feedback && (
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-700 mb-1">Admin Feedback</p>
                    <p className="text-sm text-gray-600">{request.feedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add Request Modal */}
        {showAddModal && <AddRequestModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />}
      </div>
    </div>
  )
}

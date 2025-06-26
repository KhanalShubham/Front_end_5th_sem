"use client"

import { useState } from "react"
import { useAdminRequests, useUpdateRequestStatus } from "../../hooks/useRequest"
import {
  GitPullRequest,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  FileDown,
  MessageSquare,
  Loader2,
  AlertTriangle,
  DollarSign,
  Calendar,
  User,
} from "lucide-react"
import toast from "react-hot-toast"

// Helper to get status styling
const getStatusProps = (status) => {
  switch (status) {
    case "approved":
      return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" }
    case "declined":
      return { icon: XCircle, color: "text-red-600", bg: "bg-red-100" }
    case "pending":
    default:
      return { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" }
  }
}

// Update Status Modal
const UpdateStatusModal = ({ isOpen, onClose, request, isLoading }) => {
  const [status, setStatus] = useState("approved")
  const [feedback, setFeedback] = useState("")
  const { mutate: updateStatus } = useUpdateRequestStatus()

  if (!isOpen || !request) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!feedback.trim()) {
      toast.error("Feedback is required")
      return
    }

    updateStatus(
      { id: request._id, data:{status, feedback} },
      {
        onSuccess: () => {
          onClose()
          setFeedback("")
          setStatus("approved")
        },
      },
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Review Request</h2>

        {/* Request Info */}
        <div className="mb-4 p-4 bg-gray-50 rounded-md border">
          <p className="text-sm text-gray-500">
            From: <span className="font-medium text-gray-700">{request.uploadedBy?.name || "Unknown User"}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Description: <span className="font-medium text-gray-700">{request.description}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Amount:{" "}
            <span className="font-medium text-gray-700">
              ${Number.parseFloat(request.neededAmount).toLocaleString()}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Status Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="approved"
                  checked={status === "approved"}
                  onChange={() => setStatus("approved")}
                  className="form-radio text-green-600"
                />
                <span className="ml-2 text-green-700">Approve</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="declined"
                  checked={status === "declined"}
                  onChange={() => setStatus("declined")}
                  className="form-radio text-red-600"
                />
                <span className="ml-2 text-red-700">Decline</span>
              </label>
            </div>
          </div>

          {/* Feedback */}
          <div className="mb-6">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Feedback (Required)
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Provide comments for the patient..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 flex items-center"
            >
              {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminRequests() {
  const [statusFilter, setStatusFilter] = useState("pending")
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const { requests, pagination, isLoading, isError } = useAdminRequests({
    page,
    status: statusFilter === "all" ? "" : statusFilter,
  })

  const { isPending: isUpdatingStatus } = useUpdateRequestStatus()

  const handleOpenModal = (request) => {
    setSelectedRequest(request)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedRequest(null)
    setIsModalOpen(false)
  }

  // File URL construction - FIXED
  const getFileUrl = (filename) => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050"
    return `${backendUrl}/uploads/documents/${filename}`
  }

  if (isLoading && !requests.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-red-500" />
          <p className="mt-4 text-lg font-medium text-red-700">Failed to load requests.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <GitPullRequest className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Request Management</h1>
              <p className="text-gray-600 mt-1">Review and process patient requests.</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm border">
          {["pending", "approved", "declined", "all"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status)
                setPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                statusFilter === status ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {requests.map((request) => {
            const statusProps = getStatusProps(request.status)
            const StatusIcon = statusProps.icon
            return (
              <div
                key={request._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <User className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="font-bold text-lg text-gray-800">{request.uploadedBy?.name || "Unknown User"}</p>
                        <p className="text-sm text-gray-500">{request.uploadedBy?.email}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusProps.bg} ${statusProps.color}`}
                    >
                      <StatusIcon className="h-4 w-4 mr-1.5" />
                      {request.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 font-medium">
                        ${Number.parseFloat(request.neededAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
                  </div>

                  {/* Condition */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Medical Condition</p>
                    <p className="text-sm text-gray-600">{request.condition}</p>
                  </div>

                  {/* Admin Feedback */}
                  {request.feedback && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Admin Feedback</p>
                          <p className="text-sm text-gray-600">{request.feedback}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <a
                      href={getFileUrl(request.filename)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      View File
                    </a>
                    {request.status === "pending" && (
                      <button
                        onClick={() => handleOpenModal(request)}
                        className="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {requests.length === 0 && !isLoading && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
            <GitPullRequest className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-xl font-medium text-gray-900">No Requests Found</h3>
            <p className="mt-1 text-sm text-gray-500">There are no requests matching the "{statusFilter}" filter.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="bg-white shadow-sm border rounded-lg p-4 flex items-center justify-between">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page <= 1}
              className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= pagination.totalPages}
              className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Modal */}
        <UpdateStatusModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          request={selectedRequest}
          isLoading={isUpdatingStatus}
        />
      </div>
    </div>
  )
}

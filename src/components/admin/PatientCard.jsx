"use client"

import { useState } from "react"
import { Calendar, DollarSign, FileText, Eye, Check, X, Clock, AlertTriangle, User } from "lucide-react"

const PatientCard = ({ patient, onApprove, onReject, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "critical":
        return "bg-red-900 text-red-200"
      case "high":
        return "bg-red-800 text-red-100"
      case "medium":
        return "bg-yellow-800 text-yellow-100"
      case "low":
        return "bg-green-800 text-green-100"
      default:
        return "bg-gray-800 text-gray-100"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900 text-yellow-200"
      case "approved":
        return "bg-green-900 text-green-200"
      case "rejected":
        return "bg-red-900 text-red-200"
      default:
        return "bg-gray-800 text-gray-100"
    }
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-red-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center text-white mr-4">
            {patient.profileImage ? (
              <img
                src={patient.profileImage || "/placeholder.svg"}
                alt={patient.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
            <p className="text-gray-400">
              {patient.age} years old • {patient.location}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(patient.urgency)}`}>
            {patient.urgency}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
            {patient.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-300">
          <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
          <span className="text-sm">{patient.condition}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <DollarSign className="h-4 w-4 mr-2 text-green-400" />
          <span className="text-sm">Need: ${patient.amountNeeded.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Calendar className="h-4 w-4 mr-2 text-blue-400" />
          <span className="text-sm">Submitted: {patient.submittedDate}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Clock className="h-4 w-4 mr-2 text-yellow-400" />
          <span className="text-sm">Days waiting: {patient.daysWaiting}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-300 text-sm">
          {isExpanded ? patient.description : `${patient.description.substring(0, 150)}...`}
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-red-400 hover:text-red-300 ml-1">
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Documents Provided:</span>
          <span className="text-sm text-gray-300">{patient.documents.length} files</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {patient.documents.map((doc, index) => (
            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              {doc.name}
            </span>
          ))}
        </div>
      </div>

      {patient.status === "pending" && (
        <div className="flex space-x-3">
          <button
            onClick={() => onViewDetails(patient)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </button>
          <button
            onClick={() => onApprove(patient.id)}
            className="flex-1 bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
          >
            <Check className="h-4 w-4 mr-2" />
            Approve
          </button>
          <button
            onClick={() => onReject(patient.id)}
            className="flex-1 bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
          >
            <X className="h-4 w-4 mr-2" />
            Reject
          </button>
        </div>
      )}
    </div>
  )
}

export default PatientCard

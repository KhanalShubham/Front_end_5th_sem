"use client"

import { useState } from "react"
import { X, Upload, FileText } from 'lucide-react'
import { useAddRequest } from "../../../hooks/useRequest"
import { toast } from 'react-toastify'; // Import toast for error notifications

export default function AddRequest({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    description: "",
    neededAmount: "",
    condition: "",
    inDepthStory: "",
    citizen: "",
  })
  const [selectedFile, setSelectedFile] = useState(null)

  const addRequestMutation = useAddRequest()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // BETTER VALIDATION
    if (!selectedFile) {
      toast.error("Please select a file to upload")
      return
    }

    // VALIDATE ALL REQUIRED FIELDS
    const requiredFields = ['description', 'neededAmount', 'condition', 'inDepthStory', 'citizen']
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        toast.error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
        return
      }
    }

    const submitData = new FormData()
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key])
    })
    submitData.append("file", selectedFile)

    // BETTER ERROR HANDLING IN COMPONENT
    try {
      await addRequestMutation.mutateAsync(submitData)
      // Reset form
      setFormData({
        description: "",
        neededAmount: "",
        condition: "",
        inDepthStory: "",
        citizen: "",
      })
      setSelectedFile(null)
      // Reset file input
      const fileInput = document.getElementById("file-upload")
      if (fileInput) fileInput.value = ""
      onClose()
    } catch (error) {
      // Error is already handled in the hook, but log for debugging
      console.error("Form submission error:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Submit New Request</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Request Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of your medical request..."
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Amount and Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Needed ($) *</label>
              <input
                type="number"
                value={formData.neededAmount}
                onChange={(e) => handleInputChange("neededAmount", e.target.value)}
                placeholder="0.00"
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Condition *</label>
              <select
                value={formData.condition}
                onChange={(e) => handleInputChange("condition", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select medical condition...</option>
                <option value="critical">critical</option>
                <option value="moderate">moderate</option>
              </select>
            </div>
          </div>

          {/* Citizenship Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Citizenship Status *</label>
            <select
              value={formData.citizen}
              onChange={(e) => handleInputChange("citizen", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select your citizenship status</option>
              <option value="citizen">Citizen</option>
              <option value="permanent_resident">Permanent Resident</option>
              <option value="temporary_resident">Temporary Resident</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Detailed Story */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Story *</label>
            <textarea
              value={formData.inDepthStory}
              onChange={(e) => handleInputChange("inDepthStory", e.target.value)}
              placeholder="Please provide a detailed explanation of your situation..."
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Documents *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
                id="file-upload"
                required
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  {selectedFile ? (
                    <>
                      <FileText className="h-8 w-8 text-green-500" />
                      <span className="text-sm font-medium text-green-700">{selectedFile.name}</span>
                      <span className="text-xs text-gray-500">Click to change file</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Click to upload documents</span>
                      <span className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG</span>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={addRequestMutation.isPending}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {addRequestMutation.isPending ? "Submitting..." : "Submit Request"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

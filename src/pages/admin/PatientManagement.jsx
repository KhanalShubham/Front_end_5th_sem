import { useState, useEffect } from "react"
import { Search, FileText, Download } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import PatientCard from "../../components/admin/PatientCard"

const PatientManagement = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Mock patients data
      setPatients([
        {
          id: 1,
          name: "Sarah Johnson",
          age: 7,
          location: "New York, USA",
          condition: "Leukemia",
          amountNeeded: 25000,
          submittedDate: "June 10, 2025",
          daysWaiting: 3,
          urgency: "critical",
          status: "pending",
          description:
            "Sarah is a 7-year-old girl diagnosed with leukemia. She needs urgent treatment including chemotherapy and possible bone marrow transplant. The family has exhausted their savings and insurance doesn't cover all specialized treatments. Her parents are both working but the medical costs are overwhelming. Sarah is a bright child who loves to draw and wants to become a teacher when she grows up.",
          documents: [
            { name: "Medical Report.pdf", type: "medical", url: "#" },
            { name: "Lab Results.pdf", type: "lab", url: "#" },
            { name: "Doctor's Letter.pdf", type: "recommendation", url: "#" },
            { name: "Insurance Documents.pdf", type: "insurance", url: "#" },
          ],
          contactInfo: {
            phone: "+1 (555) 123-4567",
            email: "johnson.family@email.com",
            emergencyContact: "Mary Johnson (Mother)",
          },
        },
        {
          id: 2,
          name: "Mark Williams",
          age: 45,
          location: "Chicago, USA",
          condition: "Heart Disease",
          amountNeeded: 30000,
          submittedDate: "June 8, 2025",
          daysWaiting: 5,
          urgency: "high",
          status: "pending",
          description:
            "Mark needs urgent heart surgery after a severe cardiac arrest. He is the sole breadwinner for his family of four and cannot afford the specialized cardiac procedure required to save his life. The surgery needs to be performed within the next few weeks to prevent further complications.",
          documents: [
            { name: "Cardiac Report.pdf", type: "medical", url: "#" },
            { name: "ECG Results.pdf", type: "lab", url: "#" },
            { name: "Surgery Estimate.pdf", type: "financial", url: "#" },
          ],
          contactInfo: {
            phone: "+1 (555) 987-6543",
            email: "mark.williams@email.com",
            emergencyContact: "Lisa Williams (Wife)",
          },
        },
        {
          id: 3,
          name: "Emily Chen",
          age: 12,
          location: "San Francisco, USA",
          condition: "Rare Genetic Disorder",
          amountNeeded: 45000,
          submittedDate: "June 5, 2025",
          daysWaiting: 8,
          urgency: "high",
          status: "approved",
          description:
            "Emily suffers from a rare genetic disorder that requires specialized treatment not covered by standard insurance. The treatment is experimental but shows promising results in similar cases.",
          documents: [
            { name: "Genetic Test Results.pdf", type: "medical", url: "#" },
            { name: "Specialist Consultation.pdf", type: "medical", url: "#" },
            { name: "Treatment Plan.pdf", type: "treatment", url: "#" },
          ],
          contactInfo: {
            phone: "+1 (555) 456-7890",
            email: "chen.family@email.com",
            emergencyContact: "David Chen (Father)",
          },
        },
      ])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    const matchesUrgency = urgencyFilter === "all" || patient.urgency === urgencyFilter

    return matchesSearch && matchesStatus && matchesUrgency
  })

  const handleApprovePatient = (patientId) => {
    setPatients((patients) =>
      patients.map((patient) => (patient.id === patientId ? { ...patient, status: "approved" } : patient)),
    )
  }

  const handleRejectPatient = (patientId) => {
    setPatients((patients) =>
      patients.map((patient) => (patient.id === patientId ? { ...patient, status: "rejected" } : patient)),
    )
  }

  const handleViewPatientDetails = (patient) => {
    setSelectedPatient(patient)
    setShowDetailModal(true)
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Patient Management</h1>
          <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
          >
            <option value="all">All Urgency</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Patient Cards */}
        <div className="space-y-4">
          {filteredPatients.map((patient, index) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onApprove={handleApprovePatient}
              onReject={handleRejectPatient}
              onViewDetails={handleViewPatientDetails}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>

        {/* No results */}
        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-white">No patients found</h3>
            <p className="mt-1 text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Patient Detail Modal */}
      {showDetailModal && selectedPatient && (
        <PatientDetailModal
          patient={selectedPatient}
          onClose={() => setShowDetailModal(false)}
          onApprove={handleApprovePatient}
          onReject={handleRejectPatient}
        />
      )}
    </AdminLayout>
  )
}

const PatientDetailModal = ({ patient, onClose, onApprove, onReject }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-white mb-4">Patient Details - {patient.name}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-white mb-3">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white">{patient.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Age:</span>
                        <span className="text-white">{patient.age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white">{patient.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Condition:</span>
                        <span className="text-white">{patient.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount Needed:</span>
                        <span className="text-white">${patient.amountNeeded.toLocaleString()}</span>
                      </div>
                    </div>

                    <h4 className="text-md font-medium text-white mb-3 mt-6">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Phone:</span>
                        <span className="text-white">{patient.contactInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span className="text-white">{patient.contactInfo.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Emergency Contact:</span>
                        <span className="text-white">{patient.contactInfo.emergencyContact}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-white mb-3">Medical Documents</h4>
                    <div className="space-y-2">
                      {patient.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-white text-sm">{doc.name}</span>
                          </div>
                          <button className="text-red-400 hover:text-red-300 text-sm">View</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-medium text-white mb-3">Description</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{patient.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {patient.status === "pending" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onApprove(patient.id)
                    onClose()
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-700 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onReject(patient.id)
                    onClose()
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Reject
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientManagement

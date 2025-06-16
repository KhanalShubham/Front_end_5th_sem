import { useState, useEffect } from "react"
import { Users, DollarSign, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import AdminStatCard from "../../components/admin/AdminStatCard"
import PatientCard from "../../components/admin/PatientCard"

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [recentPatients, setRecentPatients] = useState([])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Mock recent patients data
      setRecentPatients([
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
            "Sarah is a 7-year-old girl diagnosed with leukemia. She needs urgent treatment including chemotherapy and possible bone marrow transplant. The family has exhausted their savings and insurance doesn't cover all specialized treatments.",
          documents: [
            { name: "Medical Report.pdf", type: "medical" },
            { name: "Lab Results.pdf", type: "lab" },
            { name: "Doctor's Letter.pdf", type: "recommendation" },
          ],
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
            "Mark needs urgent heart surgery after a severe cardiac arrest. He is the sole breadwinner for his family and cannot afford the specialized cardiac procedure required to save his life.",
          documents: [
            { name: "Cardiac Report.pdf", type: "medical" },
            { name: "ECG Results.pdf", type: "lab" },
            { name: "Surgery Estimate.pdf", type: "financial" },
          ],
        },
      ])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: "Pending Requests",
      value: "24",
      icon: Clock,
      change: "3 new today",
      changeType: "increase",
      color: "yellow",
    },
    {
      title: "Total Donors",
      value: "1,284",
      icon: Users,
      change: "12% from last month",
      changeType: "increase",
      color: "green",
    },
    {
      title: "Approved Patients",
      value: "156",
      icon: CheckCircle,
      change: "8 this week",
      changeType: "increase",
      color: "blue",
    },
    {
      title: "Total Raised",
      value: "$2.4M",
      icon: DollarSign,
      change: "15% from last month",
      changeType: "increase",
      color: "purple",
    },
  ]

  const handleApprovePatient = (patientId) => {
    setRecentPatients((patients) =>
      patients.map((patient) => (patient.id === patientId ? { ...patient, status: "approved" } : patient)),
    )
    console.log("Approved patient:", patientId)
  }

  const handleRejectPatient = (patientId) => {
    setRecentPatients((patients) =>
      patients.map((patient) => (patient.id === patientId ? { ...patient, status: "rejected" } : patient)),
    )
    console.log("Rejected patient:", patientId)
  }

  const handleViewPatientDetails = (patient) => {
    console.log("View details for:", patient)
    // Open modal or navigate to detail page
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
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="text-sm text-gray-400">Last updated: June 13, 2025</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <AdminStatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              changeType={stat.changeType}
              color={stat.color}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>

        {/* Recent Patient Requests */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
              Recent Patient Requests
            </h2>
            <button className="text-red-400 hover:text-red-300 text-sm">View All Requests</button>
          </div>

          <div className="space-y-4">
            {recentPatients.map((patient, index) => (
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors text-left">
                Review Pending Requests
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors text-left">
                Generate Monthly Report
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors text-left">
                Manage Donor Accounts
              </button>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Platform Status</span>
                <span className="text-green-400 text-sm">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Payment Gateway</span>
                <span className="text-green-400 text-sm">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Mobile App</span>
                <span className="text-green-400 text-sm">Connected</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-green-400 mt-2 mr-3"></div>
                <div>
                  <p className="text-gray-300">Patient request approved</p>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-red-400 mt-2 mr-3"></div>
                <div>
                  <p className="text-gray-300">New patient request received</p>
                  <p className="text-gray-500 text-xs">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-blue-400 mt-2 mr-3"></div>
                <div>
                  <p className="text-gray-300">Donor verification completed</p>
                  <p className="text-gray-500 text-xs">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard

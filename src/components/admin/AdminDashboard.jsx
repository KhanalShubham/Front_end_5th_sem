"use client"
import { Link } from "react-router-dom"
import {
  Users,
  Heart,
  Activity,
  UserPlus,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  BarChart3,
  Zap,
  ChevronRight,
  Eye,
  Download,
  Stethoscope,
  Mail,
  Phone,
} from "lucide-react"
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts"
import { useAdminPatient } from "../../hooks/admin/useAdminPatient"
import { useAdminUser } from "../../hooks/admin/useAdminUser"

export default function AdminDashboard() {
  // Fetch real data from hooks
  const { patients, isLoading: patientsLoading, isError: patientsError } = useAdminPatient()
  const { users, isLoading: usersLoading, isError: usersError } = useAdminUser()

  // Loading state
  if (patientsLoading || usersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (patientsError || usersError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-16 w-16 mx-auto text-red-500 mb-4" />
          <p className="text-red-600 font-medium text-lg">Error loading dashboard data</p>
        </div>
      </div>
    )
  }

  // Process real data for charts
  const totalPatients = patients?.length || 0
  const totalDonors = users?.length || 0
  const totalRecords = totalPatients + totalDonors

  // Create chart data from real data
  const chartData = [
    { name: "Patients", count: totalPatients, color: "#3b82f6" },
    { name: "Donors", count: totalDonors, color: "#10b981" },
  ]

  // Get disease distribution from real patient data
  const diseaseStats =
    patients?.reduce((acc, patient) => {
      const disease = patient.disease || "Unknown"
      acc[disease] = (acc[disease] || 0) + 1
      return acc
    }, {}) || {}

  const pieData = Object.entries(diseaseStats)
    .slice(0, 5)
    .map(([disease, count], index) => ({
      name: disease,
      value: count,
      color: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][index] || "#6b7280",
    }))

  // Get recent patients and donors
  const recentPatients = patients?.slice(0, 5) || []
  const recentDonors = users?.slice(0, 5) || []

  // Calculate growth percentages (mock data for demo)
  const patientGrowth = "+12%"
  const donorGrowth = "+8%"
  const recordGrowth = "+15%"

  const stats = [
    {
      title: "Total Patients",
      value: totalPatients,
      change: patientGrowth,
      changeType: "positive",
      icon: Users,
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Donors",
      value: totalDonors,
      change: donorGrowth,
      changeType: "positive",
      icon: Heart,
      color: "green",
      bgGradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Total Records",
      value: totalRecords,
      change: recordGrowth,
      changeType: "positive",
      icon: Activity,
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 font-medium">Welcome back! Here's your system overview.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
              <Download className="w-4 h-4" />
              <span className="font-medium">Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={stat.title}
                className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.bgGradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        stat.changeType === "positive" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>{stat.change}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {stat.value.toLocaleString()}
                    </h3>
                    <p className="text-gray-600 font-medium text-sm">{stat.title}</p>
                  </div>

                  {/* Sparkline Effect */}
                  <div className="absolute bottom-0 right-0 w-16 h-8 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 64 32">
                      <path
                        d="M0,20 Q16,10 32,15 T64,8"
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="2"
                        fill="none"
                      />
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop
                            offset="0%"
                            stopColor={
                              stat.color === "blue" ? "#3b82f6" : stat.color === "green" ? "#10b981" : "#8b5cf6"
                            }
                          />
                          <stop
                            offset="100%"
                            stopColor={
                              stat.color === "blue" ? "#1d4ed8" : stat.color === "green" ? "#059669" : "#7c3aed"
                            }
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>Quick Actions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin/patient"
              className="group flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 hover:shadow-md"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Manage Patients</p>
                <p className="text-xs text-gray-600">Add, edit, view patients ({totalPatients} total)</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </Link>

            <Link
              to="/admin/donor"
              className="group flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:from-green-100 hover:to-emerald-100 transition-all duration-200 hover:shadow-md"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Manage Donors</p>
                <p className="text-xs text-gray-600">View, add new donors ({totalDonors} total)</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Records Overview</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-sm" />
                <YAxis axisLine={false} tickLine={false} className="text-sm" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Disease Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Disease Distribution</h2>
            {pieData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600 truncate">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No disease data</p>
                <p className="text-gray-400 text-sm">Add patients to see distribution</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Patients */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span>Recent Patients</span>
              </h2>
              <Link
                to="/admin/patient"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentPatients.length > 0 ? (
                recentPatients.map((patient, index) => (
                  <div
                    key={patient._id}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 font-semibold text-sm">
                        {patient.name?.charAt(0)?.toUpperCase() || "P"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{patient.name}</p>
                      <p className="text-sm text-gray-500 truncate">{patient.disease}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">ID: {patient._id?.slice(-5)}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{patient.contact?.slice(0, 8)}...</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No recent patients</p>
                  <p className="text-gray-400 text-sm">New patients will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Donors */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-green-500 fill-current" />
                <span>Recent Donors</span>
              </h2>
              <Link
                to="/admin/donor"
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentDonors.length > 0 ? (
                recentDonors.map((donor, index) => (
                  <div
                    key={donor._id}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-semibold text-sm">
                        {donor.username?.charAt(0)?.toUpperCase() || "D"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{donor.username}</p>
                      <p className="text-sm text-gray-500 truncate">{donor.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">ID: {donor._id?.slice(-5)}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Active</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No recent donors</p>
                  <p className="text-gray-400 text-sm">New donors will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

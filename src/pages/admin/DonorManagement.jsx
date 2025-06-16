import { useState, useEffect } from "react"
import { Search, Download, Mail } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import DonorCard from "../../components/admin/DonorCard"

const DonorManagement = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [donors, setDonors] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("totalDonated")

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Mock donors data
      setDonors([
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          location: "New York, USA",
          totalDonated: 2450,
          campaignsSupported: 18,
          impactScore: 92,
          memberSince: "Jan 2023",
          lastDonation: "2 days ago",
          recentActivity: "Donated $50 to Help Sarah Beat Cancer",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          location: "Los Angeles, USA",
          totalDonated: 1800,
          campaignsSupported: 12,
          impactScore: 85,
          memberSince: "Mar 2023",
          lastDonation: "1 week ago",
          recentActivity: "Donated $100 to Support Mark's Heart Surgery",
        },
        {
          id: 3,
          name: "Michael Johnson",
          email: "michael.j@example.com",
          location: "Chicago, USA",
          totalDonated: 3200,
          campaignsSupported: 25,
          impactScore: 96,
          memberSince: "Dec 2022",
          lastDonation: "3 days ago",
          recentActivity: "Donated $75 to Help the Johnson Family",
        },
        {
          id: 4,
          name: "Sarah Wilson",
          email: "sarah.wilson@example.com",
          location: "Miami, USA",
          totalDonated: 950,
          campaignsSupported: 8,
          impactScore: 78,
          memberSince: "May 2023",
          lastDonation: "5 days ago",
          recentActivity: "Donated $25 to Education for Rural Children",
        },
      ])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredAndSortedDonors = donors
    .filter(
      (donor) =>
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "totalDonated":
          return b.totalDonated - a.totalDonated
        case "campaignsSupported":
          return b.campaignsSupported - a.campaignsSupported
        case "impactScore":
          return b.impactScore - a.impactScore
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

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
          <h1 className="text-2xl font-bold text-white">Donor Management</h1>
          <div className="flex space-x-3">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Send Newsletter
            </button>
            <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
          >
            <option value="totalDonated">Sort by Total Donated</option>
            <option value="campaignsSupported">Sort by Campaigns Supported</option>
            <option value="impactScore">Sort by Impact Score</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{donors.length}</div>
            <div className="text-sm text-gray-400">Total Donors</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">
              ${donors.reduce((sum, donor) => sum + donor.totalDonated, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Donations</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">
              {Math.round(donors.reduce((sum, donor) => sum + donor.impactScore, 0) / donors.length)}
            </div>
            <div className="text-sm text-gray-400">Avg Impact Score</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">
              {donors.reduce((sum, donor) => sum + donor.campaignsSupported, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Campaigns Supported</div>
          </div>
        </div>

        {/* Donor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedDonors.map((donor, index) => (
            <DonorCard
              key={donor.id}
              donor={donor}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>

        {/* No results */}
        {filteredAndSortedDonors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-white">No donors found</h3>
            <p className="mt-1 text-gray-400">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default DonorManagement

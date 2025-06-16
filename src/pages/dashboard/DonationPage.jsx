"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import DashboardLayout from "../../layouts/Dashboard-layout"
import DonationCard from "../../components/ui/DonationCard"
import Tabs from "../../components/ui/Tabs"

const DonationsPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const donations = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 7,
      location: "New York, USA",
      disease: "Cancer",
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Sarah is a 7-year-old girl diagnosed with leukemia. She needs urgent treatment to survive and return to her normal childhood. Your donation will help cover her medical expenses.",
      raised: "$12,450",
      goal: "$25,000",
      progress: 49,
      urgency: "high",
    },
    {
      id: 2,
      name: "Mark Williams",
      age: 45,
      location: "Chicago, USA",
      disease: "Heart Disease",
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Mark needs an urgent heart surgery after a severe cardiac arrest. Your donation can save his life and help him return to his family who depends on him.",
      raised: "$18,200",
      goal: "$30,000",
      progress: 60,
      urgency: "critical",
    },
    {
      id: 3,
      name: "The Johnson Family",
      age: null,
      location: "Dallas, USA",
      disease: "Disaster Relief",
      image: "/placeholder.svg?height=200&width=300",
      description:
        "The Johnson family lost everything in a house fire. They need support to rebuild their lives, find temporary housing, and replace essential items.",
      raised: "$5,780",
      goal: "$15,000",
      progress: 38,
      urgency: "medium",
    },
    {
      id: 4,
      name: "Emily Chen",
      age: 12,
      location: "San Francisco, USA",
      disease: "Rare Disease",
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Emily suffers from a rare genetic disorder that requires specialized treatment. Help her family afford the medical care she desperately needs.",
      raised: "$8,340",
      goal: "$20,000",
      progress: 41,
      urgency: "high",
    },
    {
      id: 5,
      name: "Robert Garcia",
      age: 62,
      location: "Miami, USA",
      disease: "Kidney Failure",
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Robert needs dialysis and eventually a kidney transplant. Your support will help him cover medical expenses and improve his quality of life.",
      raised: "$15,600",
      goal: "$35,000",
      progress: 44,
      urgency: "medium",
    },
  ]

  const filteredDonations = donations.filter(
    (donation) =>
      donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (donation.disease && donation.disease.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const allContent = (
    <div className="space-y-6">
      {filteredDonations.map((donation, index) => (
        <DonationCard
          key={donation.id}
          id={donation.id}
          name={donation.name}
          age={donation.age}
          location={donation.location}
          disease={donation.disease}
          image={donation.image}
          description={donation.description}
          raised={donation.raised}
          goal={donation.goal}
          progress={donation.progress}
          urgency={donation.urgency}
          className="animate-fadeInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  )

  const medicalContent = (
    <div className="space-y-6">
      {filteredDonations
        .filter((donation) => ["Cancer", "Heart Disease", "Kidney Failure", "Rare Disease"].includes(donation.disease))
        .map((donation, index) => (
          <DonationCard
            key={donation.id}
            id={donation.id}
            name={donation.name}
            age={donation.age}
            location={donation.location}
            disease={donation.disease}
            image={donation.image}
            description={donation.description}
            raised={donation.raised}
            goal={donation.goal}
            progress={donation.progress}
            urgency={donation.urgency}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
    </div>
  )

  const educationContent = (
    <div className="space-y-6">
      {filteredDonations
        .filter((donation) => donation.disease === "Education")
        .map((donation, index) => (
          <DonationCard
            key={donation.id}
            id={donation.id}
            name={donation.name}
            age={donation.age}
            location={donation.location}
            disease={donation.disease}
            image={donation.image}
            description={donation.description}
            raised={donation.raised}
            goal={donation.goal}
            progress={donation.progress}
            urgency={donation.urgency}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
    </div>
  )

  const disasterContent = (
    <div className="space-y-6">
      {filteredDonations
        .filter((donation) => donation.disease === "Disaster Relief")
        .map((donation, index) => (
          <DonationCard
            key={donation.id}
            id={donation.id}
            name={donation.name}
            age={donation.age}
            location={donation.location}
            disease={donation.disease}
            image={donation.image}
            description={donation.description}
            raised={donation.raised}
            goal={donation.goal}
            progress={donation.progress}
            urgency={donation.urgency}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
    </div>
  )

  const tabs = [
    { label: "All Campaigns", content: allContent },
    { label: "Medical", content: medicalContent },
    { label: "Education", content: educationContent },
    { label: "Disaster Relief", content: disasterContent },
  ]

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 animate-fadeInDown">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                  <option>All</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                  <option>All</option>
                  <option>United States</option>
                  <option>Europe</option>
                  <option>Asia</option>
                  <option>Africa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                  <option>Most Urgent</option>
                  <option>Most Recent</option>
                  <option>Most Funded</option>
                  <option>Least Funded</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Reset
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs tabs={tabs} />

        {/* No results */}
        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default DonationsPage

"use client"

import { useState, useEffect } from "react"
import { Heart, Users, DollarSign, TrendingUp, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import DashboardLayout from "../../layouts/Dashboard-layout"
import StatCard from "../../components/ui/StatCard"
import DiseaseCard from "../../components/ui/DiseaseCard"
import CampaignCard from "../../components/ui/CampaignCard"
import Banner from "../../components/ui/Banner"

const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: "Total Donations",
      value: "$24,320",
      icon: DollarSign,
      change: "12% from last month",
      changeType: "increase",
    },
    { title: "Active Campaigns", value: "38", icon: Heart, change: "4% from last month", changeType: "increase" },
    { title: "People Helped", value: "1,284", icon: Users, change: "8% from last month", changeType: "increase" },
    { title: "Your Impact Score", value: "92/100", icon: TrendingUp },
  ]

  const diseases = [
    { title: "Cancer", count: 1240, color: "bg-red-500", image: "/placeholder.svg?height=200&width=300" },
    { title: "Heart Disease", count: 890, color: "bg-pink-500", image: "/placeholder.svg?height=200&width=300" },
    { title: "Kidney Failure", count: 560, color: "bg-purple-500", image: "/placeholder.svg?height=200&width=300" },
    { title: "Rare Diseases", count: 320, color: "bg-blue-500", image: "/placeholder.svg?height=200&width=300" },
  ]

  const featuredCampaigns = [
    {
      id: 1,
      title: "Help Sarah Beat Cancer",
      description: "Sarah is a 7-year-old girl diagnosed with leukemia. She needs urgent treatment to survive.",
      image: "/placeholder.svg?height=200&width=300",
      raised: "$12,450",
      goal: "$25,000",
      daysLeft: 12,
      progress: 49,
    },
    {
      id: 2,
      title: "Support Mark's Heart Surgery",
      description: "Mark needs an urgent heart surgery after a severe cardiac arrest. Your donation can save his life.",
      image: "/placeholder.svg?height=200&width=300",
      raised: "$18,200",
      goal: "$30,000",
      daysLeft: 8,
      progress: 60,
    },
    {
      id: 3,
      title: "Help the Johnson Family",
      description: "The Johnson family lost everything in a house fire. They need support to rebuild their lives.",
      image: "/placeholder.svg?height=200&width=300",
      raised: "$5,780",
      goal: "$15,000",
      daysLeft: 20,
      progress: 38,
    },
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
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="text-sm text-gray-500">Last updated: June 13, 2025</div>
        </div>

        <Banner
          title="Your monthly donation to 'Children's Cancer Fund' was processed successfully."
          description="Thank you for your continued support! Your donation helps save lives."
          type="success"
          className="animate-fadeInDown"
        />

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              changeType={stat.changeType}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>

        {/* Diseases Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">People Suffering by Disease</h2>
            <Link to="/dashboard/diseases" className="text-sm text-green-600 hover:text-green-700 flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {diseases.map((disease, index) => (
              <DiseaseCard
                key={index}
                title={disease.title}
                count={disease.count}
                color={disease.color}
                image={disease.image}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Featured Campaigns */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Featured Campaigns</h2>
            <Link to="/dashboard/donations" className="text-sm text-green-600 hover:text-green-700 flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCampaigns.map((campaign, index) => (
              <CampaignCard
                key={index}
                id={campaign.id}
                title={campaign.title}
                description={campaign.description}
                image={campaign.image}
                raised={campaign.raised}
                goal={campaign.goal}
                daysLeft={campaign.daysLeft}
                progress={campaign.progress}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">You donated $50 to "Help Sarah Beat Cancer"</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  You saved "Support Mark's Heart Surgery" to favorites
                </p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">You shared "Help the Johnson Family" campaign</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardHome

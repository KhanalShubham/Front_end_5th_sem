"use client"

import { Heart, Calendar, MapPin, Mail, Phone, Clock, Award } from "lucide-react"
import DashboardLayout from "../../layouts/DashboardLayout"
import Button from "../../components/Button"
import Tabs from "../../components/ui/Tabs"

const ProfilePage = () => {
  const userProfile = {
    name: "John Doe",
    title: "Dedicated Donor",
    location: "New York, USA",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    memberSince: "January 2023",
    bio: "Passionate about helping others and making a difference in the world. I believe that small acts of kindness can create big changes.",
    stats: {
      donated: "$2,450",
      campaigns: 18,
      impact: 92,
    },
    badges: [
      { name: "First Donation", icon: Heart, date: "Jan 15, 2023" },
      { name: "Monthly Donor", icon: Calendar, date: "Mar 10, 2023" },
      { name: "Top Supporter", icon: Award, date: "May 22, 2023" },
    ],
    recentDonations: [
      {
        id: 1,
        campaign: "Help Sarah Beat Cancer",
        amount: "$50",
        date: "June 10, 2025",
      },
      {
        id: 2,
        campaign: "Support Mark's Heart Surgery",
        amount: "$100",
        date: "May 28, 2025",
      },
      {
        id: 3,
        campaign: "Help the Johnson Family",
        amount: "$75",
        date: "May 15, 2025",
      },
    ],
    savedCampaigns: [
      {
        id: 4,
        title: "Education for Rural Children",
        image: "/placeholder.svg?height=100&width=150",
        progress: 65,
      },
      {
        id: 5,
        title: "Clean Water Initiative",
        image: "/placeholder.svg?height=100&width=150",
        progress: 42,
      },
    ],
  }

  const donationsContent = (
    <div className="space-y-4">
      {userProfile.recentDonations.map((donation) => (
        <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <div className="font-medium">{donation.campaign}</div>
            <div className="text-sm text-gray-500">{donation.date}</div>
          </div>
          <div className="text-green-600 font-medium">{donation.amount}</div>
        </div>
      ))}
    </div>
  )

  const savedContent = (
    <div className="space-y-4">
      {userProfile.savedCampaigns.map((campaign) => (
        <div key={campaign.id} className="flex items-center p-4 border rounded-lg">
          <img
            src={campaign.image || "/placeholder.svg"}
            alt={campaign.title}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="ml-4 flex-1">
            <div className="font-medium">{campaign.title}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">{campaign.progress}% funded</div>
          </div>
          <Button variant="outline" size="small" className="ml-4">
            View
          </Button>
        </div>
      ))}
    </div>
  )

  const tabs = [
    { label: "Donations", content: donationsContent },
    { label: "Saved Campaigns", content: savedContent },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <Button variant="outline" size="small">
            Edit Profile
          </Button>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-50 p-6 border-r border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-medium mb-4">
                  JD
                </div>
                <h2 className="text-xl font-bold text-gray-900">{userProfile.name}</h2>
                <p className="text-gray-600">{userProfile.title}</p>

                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{userProfile.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Member since {userProfile.memberSince}</span>
                  </div>
                </div>

                <div className="w-full mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">About</h3>
                  <p className="text-sm text-gray-600">{userProfile.bio}</p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{userProfile.stats.donated}</div>
                  <div className="text-sm text-gray-600">Total Donated</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{userProfile.stats.campaigns}</div>
                  <div className="text-sm text-gray-600">Campaigns Supported</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{userProfile.stats.impact}</div>
                  <div className="text-sm text-gray-600">Impact Score</div>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-4">Badges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {userProfile.badges.map((badge, index) => (
                  <div key={index} className="border rounded-lg p-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <badge.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{badge.name}</div>
                      <div className="text-xs text-gray-500">{badge.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-4">Activity</h3>
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage

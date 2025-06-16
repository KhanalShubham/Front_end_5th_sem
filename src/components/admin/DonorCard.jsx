"use client"

import { Calendar, Heart, MapPin, User, TrendingUp } from "lucide-react"

const DonorCard = ({ donor, className = "" }) => {
  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-red-600 transition-colors ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center text-white mr-4">
            {donor.profileImage ? (
              <img
                src={donor.profileImage || "/placeholder.svg"}
                alt={donor.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{donor.name}</h3>
            <p className="text-gray-400">{donor.email}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">${donor.totalDonated.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Total Donated</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-300">
          <Heart className="h-4 w-4 mr-2 text-red-400" />
          <div>
            <div className="text-sm font-medium">{donor.campaignsSupported}</div>
            <div className="text-xs text-gray-400">Campaigns</div>
          </div>
        </div>
        <div className="flex items-center text-gray-300">
          <TrendingUp className="h-4 w-4 mr-2 text-blue-400" />
          <div>
            <div className="text-sm font-medium">{donor.impactScore}/100</div>
            <div className="text-xs text-gray-400">Impact Score</div>
          </div>
        </div>
        <div className="flex items-center text-gray-300">
          <MapPin className="h-4 w-4 mr-2 text-yellow-400" />
          <div>
            <div className="text-sm font-medium">{donor.location}</div>
            <div className="text-xs text-gray-400">Location</div>
          </div>
        </div>
        <div className="flex items-center text-gray-300">
          <Calendar className="h-4 w-4 mr-2 text-green-400" />
          <div>
            <div className="text-sm font-medium">{donor.memberSince}</div>
            <div className="text-xs text-gray-400">Member Since</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Recent Activity:</span>
          <span className="text-xs text-gray-500">{donor.lastDonation}</span>
        </div>
        <p className="text-sm text-gray-300">{donor.recentActivity}</p>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors text-sm">
          View Profile
        </button>
        <button className="flex-1 bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors text-sm">
          Contact Donor
        </button>
      </div>
    </div>
  )
}

export default DonorCard

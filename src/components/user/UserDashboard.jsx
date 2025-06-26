"use client"
import { Link } from "react-router-dom"
import {
  LayoutDashboard,
  MessageSquare,
  Bell,
  Heart,
  Smile,
  Settings,
  Calendar
} from "lucide-react"

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 flex items-center space-x-2">
              <LayoutDashboard className="w-7 h-7" />
              <span>User Dashboard</span>
            </h1>
            <p className="text-gray-600 mt-1">Welcome back, here’s your personal overview.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600 text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <Link to="/user/myrequests" className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50 transition">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <span className="text-gray-800 font-medium">My Requests</span>
          </Link>

          <Link to="/user/notifications" className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50 transition">
            <Bell className="w-6 h-6 text-blue-600" />
            <span className="text-gray-800 font-medium">Notifications</span>
          </Link>

          <Link to="/user/funds" className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50 transition">
            <Heart className="w-6 h-6 text-pink-500" />
            <span className="text-gray-800 font-medium">Fund Info</span>
          </Link>

          <Link to="/user/mental-health" className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50 transition">
            <Smile className="w-6 h-6 text-green-600" />
            <span className="text-gray-800 font-medium">Mental Health Corner</span>
          </Link>

          <Link to="/user/settings" className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50 transition">
            <Settings className="w-6 h-6 text-gray-600" />
            <span className="text-gray-800 font-medium">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

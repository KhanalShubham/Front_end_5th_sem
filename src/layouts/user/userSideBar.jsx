"use client"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Bell,
  Heart,
  MessageSquare,
  Settings,
  Smile,
} from "lucide-react"

export default function UserSidebar() {
  const location = useLocation()

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/user/dashboard" },
    { name: "My Requests", icon: MessageSquare, path: "/user/requests" },
    { name: "Notifications", icon: Bell, path: "/user/notifications" },
    { name: "Fund Info", icon: Heart, path: "/user/funds" },
    { name: "Mental Health", icon: Smile, path: "/user/mental-health" },
    { name: "Settings", icon: Settings, path: "/user/settings" },
  ]

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 space-y-8 shadow-sm">
      <div className="text-2xl font-bold text-blue-600">User Panel</div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

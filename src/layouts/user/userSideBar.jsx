// layouts/user/userSideBar.jsx
"use client"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Bell,
  Heart,
  MessageSquare,
  Settings,
  Smile,
  MessageCircle,
} from "lucide-react"
import { useNotifications } from '../../contexts/NotificationContext'; // Path from layouts/user/ to contexts/

export default function UserSidebar() {
  const location = useLocation()
  const { unreadCount } = useNotifications();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/user/dashboard" },
    { name: "My Requests", icon: MessageSquare, path: "/user/requests" },
    { name: "Notifications", icon: Bell, path: "/user/notifications", hasBadge: true },
    { name: "Message", icon: MessageCircle, path: "/user/message" },
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
              } relative`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
              {item.hasBadge && unreadCount > 0 && (
                <span className="absolute top-1 right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {unreadCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
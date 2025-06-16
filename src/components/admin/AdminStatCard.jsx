"use client"

const AdminStatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = "increase",
  color = "red",
  className = "",
}) => {
  const colorClasses = {
    red: "bg-red-900 text-red-100",
    green: "bg-green-900 text-green-100",
    blue: "bg-blue-900 text-blue-100",
    yellow: "bg-yellow-900 text-yellow-100",
    purple: "bg-purple-900 text-purple-100",
  }

  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`flex items-center justify-center h-12 w-12 rounded-md ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-400 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-semibold text-white">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      {change && (
        <div className="mt-4">
          <div className={`flex items-center text-sm ${changeType === "increase" ? "text-green-400" : "text-red-400"}`}>
            <span>{change}</span>
            <span className="ml-1">{changeType === "increase" ? "increase" : "decrease"}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminStatCard

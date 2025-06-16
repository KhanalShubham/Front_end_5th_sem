"use client"

import { useState } from "react"
import { Save, Shield, Bell, Database, Mail, Globe, Users } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general")

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "HopeCare",
    platformDescription: "Medical Emergency Funding Platform",
    maintenanceMode: false,
    registrationEnabled: true,
    maxPatientRequests: 100,
    reviewTimeLimit: 7, // days
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: true,
    sessionTimeout: 30, // minutes
    passwordExpiry: 90, // days
    maxLoginAttempts: 5,
    ipWhitelist: "",
    auditLogging: true,
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newPatientAlerts: true,
    urgentCaseAlerts: true,
    systemAlerts: true,
    weeklyReports: true,
  })

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.hopecare.com",
    smtpPort: "587",
    smtpUsername: "admin@hopecare.com",
    smtpPassword: "••••••••",
    fromEmail: "noreply@hopecare.com",
    fromName: "HopeCare Admin",
  })

  const handleSaveSettings = (settingsType) => {
    console.log(`Saving ${settingsType} settings`)
    // Save logic here
  }

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "email", label: "Email", icon: Mail },
    { id: "users", label: "User Management", icon: Users },
    { id: "database", label: "Database", icon: Database },
  ]

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Platform Name</label>
          <input
            type="text"
            value={generalSettings.platformName}
            onChange={(e) => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Review Time Limit (Days)</label>
          <input
            type="number"
            value={generalSettings.reviewTimeLimit}
            onChange={(e) =>
              setGeneralSettings({ ...generalSettings, reviewTimeLimit: Number.parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Platform Description</label>
        <textarea
          value={generalSettings.platformDescription}
          onChange={(e) => setGeneralSettings({ ...generalSettings, platformDescription: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <div className="text-white font-medium">Maintenance Mode</div>
            <div className="text-sm text-gray-400">Temporarily disable platform access</div>
          </div>
          <input
            type="checkbox"
            checked={generalSettings.maintenanceMode}
            onChange={(e) => setGeneralSettings({ ...generalSettings, maintenanceMode: e.target.checked })}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <div className="text-white font-medium">Registration Enabled</div>
            <div className="text-sm text-gray-400">Allow new user registrations</div>
          </div>
          <input
            type="checkbox"
            checked={generalSettings.registrationEnabled}
            onChange={(e) => setGeneralSettings({ ...generalSettings, registrationEnabled: e.target.checked })}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
          />
        </div>
      </div>

      <button
        onClick={() => handleSaveSettings("general")}
        className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-md flex items-center"
      >
        <Save className="h-4 w-4 mr-2" />
        Save General Settings
      </button>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (Minutes)</label>
          <input
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={(e) =>
              setSecuritySettings({ ...securitySettings, sessionTimeout: Number.parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={securitySettings.maxLoginAttempts}
            onChange={(e) =>
              setSecuritySettings({ ...securitySettings, maxLoginAttempts: Number.parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">IP Whitelist (One per line)</label>
        <textarea
          value={securitySettings.ipWhitelist}
          onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
          rows={4}
          placeholder="192.168.1.1&#10;10.0.0.1"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <div className="text-white font-medium">Two-Factor Authentication</div>
            <div className="text-sm text-gray-400">Require 2FA for all admin accounts</div>
          </div>
          <input
            type="checkbox"
            checked={securitySettings.twoFactorRequired}
            onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorRequired: e.target.checked })}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <div className="text-white font-medium">Audit Logging</div>
            <div className="text-sm text-gray-400">Log all administrative actions</div>
          </div>
          <input
            type="checkbox"
            checked={securitySettings.auditLogging}
            onChange={(e) => setSecuritySettings({ ...securitySettings, auditLogging: e.target.checked })}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
          />
        </div>
      </div>

      <button
        onClick={() => handleSaveSettings("security")}
        className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-md flex items-center"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Security Settings
      </button>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div>
              <div className="text-white font-medium">
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </div>
              <div className="text-sm text-gray-400">
                {key === "emailNotifications" && "Send notifications via email"}
                {key === "smsNotifications" && "Send notifications via SMS"}
                {key === "newPatientAlerts" && "Alert when new patients register"}
                {key === "urgentCaseAlerts" && "Alert for critical/urgent cases"}
                {key === "systemAlerts" && "System maintenance and error alerts"}
                {key === "weeklyReports" && "Weekly summary reports"}
              </div>
            </div>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setNotificationSettings({ ...notificationSettings, [key]: e.target.checked })}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => handleSaveSettings("notifications")}
        className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-md flex items-center"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Notification Settings
      </button>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Server</label>
          <input
            type="text"
            value={emailSettings.smtpServer}
            onChange={(e) => setEmailSettings({ ...emailSettings, smtpServer: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Port</label>
          <input
            type="text"
            value={emailSettings.smtpPort}
            onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">From Email</label>
          <input
            type="email"
            value={emailSettings.fromEmail}
            onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">From Name</label>
          <input
            type="text"
            value={emailSettings.fromName}
            onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h4 className="text-white font-medium mb-3">Test Email Configuration</h4>
        <div className="flex space-x-3">
          <input
            type="email"
            placeholder="test@example.com"
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
          <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md">Send Test Email</button>
        </div>
      </div>

      <button
        onClick={() => handleSaveSettings("email")}
        className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-md flex items-center"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Email Settings
      </button>
    </div>
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-700">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-red-900 text-white border-b-2 border-red-500"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "general" && renderGeneralSettings()}
            {activeTab === "security" && renderSecuritySettings()}
            {activeTab === "notifications" && renderNotificationSettings()}
            {activeTab === "email" && renderEmailSettings()}
            {activeTab === "users" && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-white">User Management</h3>
                <p className="text-gray-400">Manage admin users and permissions</p>
              </div>
            )}
            {activeTab === "database" && (
              <div className="text-center py-12">
                <Database className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-white">Database Settings</h3>
                <p className="text-gray-400">Database configuration and maintenance</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminSettings

"use client"

import { useState } from "react"
import { Save, User, Bell, CreditCard, Shield, Wallet } from "lucide-react"
import DashboardLayout from "../../layouts/DashboardLayout"
import Input from "../../components/ui/Input"
import PasswordInput from "../../components/ui/PasswordInput"
import Checkbox from "../../components/ui/Checkbox"
import Button from "../../components/Button"

const SettingsPage = () => {
  // Profile settings
  const [profileForm, setProfileForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  })

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    newCampaigns: true,
    campaignUpdates: true,
    donationReceipts: true,
    newsletter: false,
  })

  const [pushNotifications, setPushNotifications] = useState({
    newCampaigns: false,
    campaignUpdates: true,
    donationReceipts: true,
    promotions: false,
  })

  // Payment settings
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "card", last4: "4242", expiry: "12/25", default: true },
    { id: 2, type: "paypal", email: "john.doe@example.com", default: false },
  ])

  // Security settings
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm({
      ...profileForm,
      [name]: value,
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    })
  }

  const handleEmailNotificationChange = (key) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key],
    })
  }

  const handlePushNotificationChange = (key) => {
    setPushNotifications({
      ...pushNotifications,
      [key]: !pushNotifications[key],
    })
  }

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        default: method.id === id,
      })),
    )
  }

  const handleRemovePayment = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const profileContent = (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input label="First Name" name="firstName" value={profileForm.firstName} onChange={handleProfileChange} />
          <Input label="Last Name" name="lastName" value={profileForm.lastName} onChange={handleProfileChange} />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={profileForm.email}
            onChange={handleProfileChange}
          />
          <Input label="Phone Number" name="phone" value={profileForm.phone} onChange={handleProfileChange} />
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="primary" className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Picture</h3>
        <div className="flex items-center">
          <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-medium">
            JD
          </div>
          <div className="ml-6">
            <Button variant="outline" size="small" className="mb-2">
              Upload New Picture
            </Button>
            <p className="text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>
      </div>
    </div>
  )

  const notificationsContent = (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <Checkbox
            id="email-new-campaigns"
            label="New campaigns that match your interests"
            checked={emailNotifications.newCampaigns}
            onChange={() => handleEmailNotificationChange("newCampaigns")}
          />
          <Checkbox
            id="email-campaign-updates"
            label="Updates on campaigns you've donated to"
            checked={emailNotifications.campaignUpdates}
            onChange={() => handleEmailNotificationChange("campaignUpdates")}
          />
          <Checkbox
            id="email-donation-receipts"
            label="Donation receipts and tax documents"
            checked={emailNotifications.donationReceipts}
            onChange={() => handleEmailNotificationChange("donationReceipts")}
          />
          <Checkbox
            id="email-newsletter"
            label="Weekly newsletter and platform updates"
            checked={emailNotifications.newsletter}
            onChange={() => handleEmailNotificationChange("newsletter")}
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
        <div className="space-y-4">
          <Checkbox
            id="push-new-campaigns"
            label="New campaigns that match your interests"
            checked={pushNotifications.newCampaigns}
            onChange={() => handlePushNotificationChange("newCampaigns")}
          />
          <Checkbox
            id="push-campaign-updates"
            label="Updates on campaigns you've donated to"
            checked={pushNotifications.campaignUpdates}
            onChange={() => handlePushNotificationChange("campaignUpdates")}
          />
          <Checkbox
            id="push-donation-receipts"
            label="Donation confirmations"
            checked={pushNotifications.donationReceipts}
            onChange={() => handlePushNotificationChange("donationReceipts")}
          />
          <Checkbox
            id="push-promotions"
            label="Promotions and special events"
            checked={pushNotifications.promotions}
            onChange={() => handlePushNotificationChange("promotions")}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  )

  const paymentContent = (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                {method.type === "card" ? (
                  <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                ) : (
                  <Wallet className="h-6 w-6 text-gray-400 mr-3" />
                )}
                <div>
                  {method.type === "card" ? (
                    <div className="font-medium">•••• •••• •••• {method.last4}</div>
                  ) : (
                    <div className="font-medium">{method.email}</div>
                  )}
                  <div className="text-sm text-gray-500">
                    {method.type === "card" ? `Expires ${method.expiry}` : "PayPal"}
                    {method.default && <span className="ml-2 text-green-600">Default</span>}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {!method.default && (
                  <button
                    onClick={() => handleSetDefaultPayment(method.id)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Set as default
                  </button>
                )}
                <button
                  onClick={() => handleRemovePayment(method.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input label="Address Line 1" name="address1" placeholder="123 Main St" />
          <Input label="Address Line 2" name="address2" placeholder="Apt 4B" />
          <Input label="City" name="city" placeholder="New York" />
          <Input label="State/Province" name="state" placeholder="NY" />
          <Input label="Postal Code" name="postalCode" placeholder="10001" />
          <Input label="Country" name="country" placeholder="United States" />
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="primary" className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Address
          </Button>
        </div>
      </div>
    </div>
  )

  const securityContent = (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
          />
          <PasswordInput
            label="New Password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            showRequirements={true}
          />
          <PasswordInput
            label="Confirm New Password"
            name="confirmPassword"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="primary" className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Update Password
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        <p className="text-gray-600 mb-4">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </p>
        <div className="flex items-center">
          <div className="flex-1">
            <div className="font-medium">Two-factor authentication</div>
            <div className="text-sm text-gray-500">{twoFactorEnabled ? "Enabled" : "Disabled"}</div>
          </div>
          <Button
            variant={twoFactorEnabled ? "outline" : "primary"}
            className={twoFactorEnabled ? "" : "bg-green-600 hover:bg-green-700"}
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
          >
            {twoFactorEnabled ? "Disable" : "Enable"}
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Login Sessions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-100">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <div className="font-medium">Current Session</div>
                <div className="text-sm text-gray-500">Chrome on Windows • New York, USA • June 13, 2025</div>
              </div>
            </div>
            <div className="text-sm font-medium text-green-600">Active Now</div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div className="ml-3">
                <div className="font-medium">Safari on iPhone</div>
                <div className="text-sm text-gray-500">New York, USA • June 10, 2025</div>
              </div>
            </div>
            <button className="text-sm text-red-600 hover:text-red-700">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  )

  const tabs = [
    { label: "Profile", content: profileContent, icon: User },
    { label: "Notifications", content: notificationsContent, icon: Bell },
    { label: "Payment", content: paymentContent, icon: CreditCard },
    { label: "Security", content: securityContent, icon: Shield },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
            >
              {tabs.map((tab, index) => (
                <option key={index}>{tab.label}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`
                      w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm
                      ${
                        index === 0
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    <tab.icon className="h-5 w-5 mx-auto mb-1" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="p-6">{tabs[0].content}</div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "../pages/Homepage"
import { LoginPage } from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import DashboardHome from "../pages/dashboard/DashboardHome"
import DonationsPage from "../pages/dashboard/DonationPage"
import DonationDetailPage from "../pages/dashboard/DonationDetailPage"
import SettingsPage from "../pages/dashboard/SettingsPage"
import ProfilePage from "../pages/dashboard/ProfilePage"
import AdminDashboard from "../pages/admin/AdminDashboard"
import DonorManagement from "../pages/admin/DonorManagement"
import PatientManagement from "../pages/admin/PatientManagement"
import TermsConditions from "../pages/admin/TermsAndConsitions"
import AdminSettings from "../pages/admin/AdminSettings"
import AdminLoginPage from "../pages/AdminLogin"

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Donor Dashboard */}
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/dashboard/donations" element={<DonationsPage />} />
      <Route path="/dashboard/donations/:id" element={<DonationDetailPage />} />
      <Route path="/dashboard/settings" element={<SettingsPage />} />
      <Route path="/dashboard/profile" element={<ProfilePage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/patients" element={<PatientManagement />} />
      <Route path="/admin/donors" element={<DonorManagement />} />
      <Route path="/admin/terms" element={<TermsConditions />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter

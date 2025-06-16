import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "../pages/Homepage"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import DashboardHome from "../pages/dashboard/DashboardHome"
import DonationsPage from "../pages/dashboard/DonationPage"
import DonationDetailPage from "../pages/dashboard/DonationDetailPage"
import SettingsPage from "../pages/dashboard/SettingsPage"
import ProfilePage from "../pages/dashboard/ProfilePage"
import AdminDashboard from "../pages/admin/AdminDashboard"
import DonorManagement from "../pages/admin/DonorManagement"
import PatientManagement from "../pages/admin/PatientManagement"

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/dashboard/donations" element={<DonationsPage />} />
      <Route path="/dashboard/donations/:id" element={<DonationDetailPage />} />
      <Route path="/dashboard/settings" element={<SettingsPage />} />
      <Route path="/dashboard/profile" element={<ProfilePage />} />
      <Route path="admin/dashboard" element={<AdminDashboard/>}></Route>
      <Route path="/admin/patients" element={<PatientManagement />} />
      <Route path="/admin/donors" element={<DonorManagement />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "../pages/Homepage"
import { LoginPage } from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import DashboardHome from "../pages/dashboard/DashboardHome"
import DonationsPage from "../pages/dashboard/DonationPage"
import DonationDetailPage from "../pages/dashboard/DonationDetailPage"
import SettingsPage from "../pages/dashboard/SettingsPage"
import ProfilePage from "../pages/dashboard/ProfilePage"
import UserManagement from "../pages/admin/UserManagement"
import PatientManagement from "../pages/admin/PatientManagement"
import RequestManagement from "../pages/admin/RequestManagement"
import AdminMainLayout from "../layouts/admin/adminMainLayout"
import AdminDashboardManagement from "../components/admin/AdminDashboard"

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
      <Route path="/admin/*" element={<AdminMainLayout/>}>
        <Route index element={<AdminDashboardManagement />} />
        <Route path="donor" element={<UserManagement/>}/>
        <Route path="patient" element={<PatientManagement/>}/>
        <Route path="request" element={<RequestManagement/>}/>
      </Route>

    </Routes>
  </BrowserRouter>
)

export default AppRouter

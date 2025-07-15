import { Route, Routes } from "react-router-dom"
import Homepage from "../pages/Homepage"
import { LoginPage } from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import UserDashboard from "../components/user/UserDashboard"
import MyRequest from "../components/user/MyRequest"
import UserMessage from "../components/user/UserMessage"
import MentalHealth from "../components/user/MentalHealth"
import SettingPage from "../components/user/SettingsPage"
import NotificationsPage from "../pages/user/NotificationsPage"
import AdminMainLayout from "../layouts/admin/adminMainLayout"
import AdminDashboardManagement from "../pages/admin/AdminDashboardManagement"
import UserManagement from "../pages/admin/UserManagement"
import RequestManagement from "../pages/admin/RequestManagement"
import MessageAdmin from "../pages/admin/MessageAdmin"

// 1. Import the new DonationPage component
import DonationPage from "../pages/DonationPage"
import DonationSuccessPage from "../pages/DonationSuccessPage";
import DonationFailurePage from "../pages/DonationFailurePage";


const AppRouter = () => (
  <Routes>
    {/* --- Public Routes --- */}
    <Route path="/" element={<Homepage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />

    {/*
      2. Add the route for the donation page here.
      It's a public route, so anyone can access it.
      The ':campaignId' part makes the URL dynamic.
    */}
    <Route path="/donate/:campaignId" element={<DonationPage />} />
    <Route path="/donation/success" element={<DonationSuccessPage />} />
    <Route path="/donation/failure" element={<DonationFailurePage />} />


    {/* --- User Routes --- */}
    <Route path="/user/dashboard" element={<UserDashboard />} />
    <Route path="/user/myrequests" element={<MyRequest />} />
    <Route path="/user/notifications" element={<NotificationsPage />} />
    <Route path="/user/message" element={<UserMessage />} />
    <Route path="/user/mental-health" element={<MentalHealth />} />
    <Route path="/user/settings" element={<SettingPage />} />


    {/* --- Admin Routes (nested inside a layout) --- */}
    <Route path="/admin/" element={<AdminMainLayout />}>
      <Route index element={<AdminDashboardManagement />} />
      <Route path="user" element={<UserManagement />} />
      <Route path="request" element={<RequestManagement />} />
      <Route path="message" element={<MessageAdmin />} />
    </Route>

    {/* --- Fallback Route for 404 --- */}
    <Route path="*" element={<div><h1>404 Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
  </Routes>
)

export default AppRouter;
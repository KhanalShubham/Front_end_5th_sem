import { Route, Routes } from "react-router-dom" // Remove BrowserRouter from imports
// Assuming these are at root level
import Homepage from "../pages/Homepage"
import { LoginPage } from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"

// Assuming these are at root level `components/user/`
import UserDashboard from "../components/user/UserDashboard"
import MyRequest from "../components/user/MyRequest"
import UserMessage from "../components/user/UserMessage"
import MentalHealth from "../components/user/MentalHealth"
import SettingPage from "../components/user/SettingsPage"

// Assuming this is at root level `pages/user/`
import NotificationsPage from "../pages/user/NotificationsPage"

// Assuming these are at root level layouts/admin/ and pages/admin/
import AdminMainLayout from "../layouts/admin/adminMainLayout"
import AdminDashboardManagement from "../pages/admin/AdminDashboardManagement"
import UserManagement from "../pages/admin/UserManagement"
import RequestManagement from "../pages/admin/RequestManagement"
import MessageAdmin from "../pages/admin/MessageAdmin"


const AppRouter = () => (
  // REMOVE <BrowserRouter> HERE! It's already in main.jsx
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />

    {/* User Routes */}
    <Route path="/user/dashboard" element={<UserDashboard />} />
    <Route path="/user/myrequests" element={<MyRequest />} />
    <Route path="/user/notifications" element={<NotificationsPage />} />
    <Route path="/user/message" element={<UserMessage />} />
    <Route path="/user/mental-health" element={<MentalHealth />} />
    <Route path="/user/settings" element={<SettingPage />} />


    {/* Admin Routes */}
    <Route path="/admin/" element={<AdminMainLayout />}>
      <Route index element={<AdminDashboardManagement />} />
      <Route path="user" element={<UserManagement />} />
      <Route path="request" element={<RequestManagement />} />
      <Route path="message" element={<MessageAdmin />} />
    </Route>

    {/* Fallback route for 404 */}
    <Route path="*" element={<div>404 Not Found</div>} /> {/* Added a generic 404 */}
  </Routes>
  // REMOVE </BrowserRouter> HERE!
)

export default AppRouter;
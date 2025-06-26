import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "../pages/Homepage"
import { LoginPage } from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import UserDashboard from "../components/user/UserDashboard"
import MyRequest from "../components/user/MyRequest"
import UserManagement from "../pages/admin/UserManagement"
import Fund from "../components/user/FundInfo"
import Notifications from "../components/user/Notification"
import MentalHealth from "../components/user/MentalHealth"
import SettingPage  from "../components/user/SettingsPage"
//import PatientManagement from "../pages/admin/PatientManagement"
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
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/myrequests" element={<MyRequest/>}/>
      <Route path="/user/notifications" element={<Notifications/>}/>
      <Route path="/user/funds" element={<Fund/>}/>
      <Route path="/user/mental-health" element={<MentalHealth/>}/>
      <Route path="/user/settings" element={<SettingPage/>}/>


      {/* Admin Routes */}
      <Route path="/admin/" element={<AdminMainLayout/>}>
        <Route index element={<AdminDashboardManagement />} />
        <Route path="user" element={<UserManagement/>}/>
        {/* <Route path="patient" element={<PatientManagement/>}/> */}
        <Route path="request" element={<RequestManagement/>}/>
      </Route>

    </Routes>
  </BrowserRouter>
)

export default AppRouter

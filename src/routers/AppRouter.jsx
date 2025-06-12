import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "../pages/Homepage"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import DashboardPage from "../pages/DashboardPage"

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="login"element={<LoginPage/>}/>
      <Route path="signup"element={<SignupPage/>}/>
      <Route path="dashboard" element={<DashboardPage/>}/>
    </Routes>
  </BrowserRouter>
)

export default AppRouter

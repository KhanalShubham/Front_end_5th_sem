import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "../pages/Homepage"

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter

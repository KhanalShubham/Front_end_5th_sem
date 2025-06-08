import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "../pages/Homepage";


const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />}></Route>
        </Routes>
    </BrowserRouter>
)
export default AppRouter;
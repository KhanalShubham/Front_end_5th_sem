"use client"
import { Shield } from "lucide-react"
import { useNavigate } from "react-router-dom" // Import useNavigate
import AdminForm from "../components/auth/adminForm"
import AuthLayout from "../components/authlayout"

const AdminLoginPage = () => {
  const navigate = useNavigate() // Initialize navigate

  return (
    // <div className="min-h-screen flex bg-gray-900">
    //   {/* Left side - Admin Form */}
      
    //   {/* Right side - Admin Image */}
    //   {/* <div className="hidden lg:block lg:w-1/2 relative">
    //     <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-gray-900"></div>
    //     <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    //     <div className="absolute inset-0 flex items-center justify-center"></div>
    //   </div> */}
    // </div>
    <AuthLayout colorBackground="bg-gray-900">
      
        <div className="w-full max-w-md">
          <div className="animate-fadeInUp">
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => navigate("/login")} // Navigate to Donor Login
                className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900"
              >
                Donor Login
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/login")} // Stay on Admin Portal
                className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors bg-white text-gray-900 shadow-sm"
              >
                Admin Portal
              </button>
            </div>

            <AdminForm />

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">Authorized personnel only. All access is monitored and logged.</p>
            </div>
          </div>
        </div>
   

    </AuthLayout>
  )
}

export default AdminLoginPage
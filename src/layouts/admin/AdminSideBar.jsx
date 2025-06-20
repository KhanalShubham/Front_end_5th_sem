import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, LogOut } from 'lucide-react';

export default function Sidebar() {
  const linkClasses =
    'flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition';

  const activeClasses = 'bg-gray-100 font-semibold';

  return (
    <aside className="w-64 min-h-screen bg-white border-r px-4 py-6 flex flex-col justify-between">
      <div>
        {/* Logo Section */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="bg-black text-white rounded-md p-2">
            <span className="text-xl">❤️</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">Hope Care</h1>
            <p className="text-sm text-gray-500">Admin Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-xs uppercase text-gray-400 mb-2">Navigation</h2>
          <nav className="space-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClasses : ''}`
              }
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/donor"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClasses : ''}`
              }
            >
              <Users className="w-5 h-5" />
              <span>Donors</span>
            </NavLink>

            <NavLink
              to="/admin/patient"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClasses : ''}`
              }
            >
              <UserPlus className="w-5 h-5" />
              <span>Patients</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Sign Out */}
      <NavLink
        to="/logout"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ''}`
        }
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </NavLink>
    </aside>
  );
}

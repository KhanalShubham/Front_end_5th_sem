import React from 'react';
import Sidebar from './AdminSideBar';
import { Outlet } from 'react-router-dom';

export default function AdminMainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
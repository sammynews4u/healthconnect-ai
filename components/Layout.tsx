
import React from 'react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentRole }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-heartbeat text-white text-lg"></i>
            </div>
            <span className="font-bold text-xl text-gray-800 tracking-tight">HealthConnect AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition">Appointments</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition">Medical Records</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition">Settings</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600">
              <i className="far fa-bell text-xl"></i>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center overflow-hidden">
              <img src={`https://picsum.photos/seed/${currentRole}/100`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden bg-white border-t border-gray-100 fixed bottom-0 left-0 right-0 px-6 py-3 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-50">
        <button className="flex flex-col items-center gap-1 text-blue-600">
          <i className="fas fa-home text-lg"></i>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <i className="fas fa-calendar-alt text-lg"></i>
          <span className="text-[10px]">Agenda</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <i className="fas fa-comment-medical text-lg"></i>
          <span className="text-[10px]">Chat</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <i className="fas fa-user-circle text-lg"></i>
          <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Layout;

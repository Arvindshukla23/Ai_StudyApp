import React from "react";
import { Bell } from "lucide-react";

const Navbar = ({ user }) => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-6 border-b bg-white">
      
      {/* 🔍 Search Bar */}
      <div className="relative w-[400px]">
        <input
          type="text"
          placeholder="Search notes, quizzes..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="absolute left-3 top-2.5 text-gray-400">
          🔍
        </span>
      </div>

      {/* 🔔 Right Section */}
      <div className="flex items-center gap-6">
        
        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell className="text-gray-600" />
        </div>

        {/* 👤 Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          
          {/* Profile Image (dynamic fallback) */}
          <img
            src={user?.profilePic || "https://i.pravatar.cc/40"}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />

          <div className="leading-tight">
            <p className="text-sm font-semibold">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">
              Student
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Navbar;
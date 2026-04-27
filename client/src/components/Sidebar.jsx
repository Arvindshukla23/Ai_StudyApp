import React from "react";
import {
  LayoutDashboard,
  Upload,
  BookOpen,
  MessageSquare,
  ClipboardList,
  User,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Upload Notes", icon: Upload, path: "/upload" },
    { name: "Chats", icon: MessageSquare, path: "/chat" },
    { name: "Quiz", icon: ClipboardList, path: "/quiz" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    console.log("🚪 Logged out");

    navigate("/");
  };

  return (
    
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between p-5">
      
      {/* 🔹 TOP SECTION */}
      <div>

        {/* Logo */}
        <h1 className="flex items-center gap-2 text-xl font-bold mb-6 text-blue-600">
          <BookOpen size={24} />
          <span>Study AI</span>
        </h1>

        {/* Menu */}
        <div className="space-y-2 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link to={item.path} key={index}>
                <div
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 🔥 CHAT SECTION (ONLY ON CHAT PAGE) */}
        {isChatPage && (
          <div>
            {/* New Chat Button */}
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition">
              <Plus size={16} />
              New Chat
            </button>

            {/* Recent Chats */}
            <p className="text-sm text-gray-400 mb-2">Recent Chats</p>

            <div className="space-y-3 text-sm">
              <div className="cursor-pointer hover:bg-gray-100 p-2 rounded">
                <p className="font-medium">Machine Learning Basics</p>
                <p className="text-gray-400 text-xs">Today</p>
              </div>

              <div className="cursor-pointer hover:bg-gray-100 p-2 rounded">
                <p className="font-medium">Calculus Help</p>
                <p className="text-gray-400 text-xs">Yesterday</p>
              </div>

              <div className="cursor-pointer hover:bg-gray-100 p-2 rounded">
                <p className="font-medium">Data Structures</p>
                <p className="text-gray-400 text-xs">2 days ago</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 🔹 BOTTOM SECTION */}
      <div className="space-y-3">
        
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Settings size={18} />
          <span>Settings</span>
        </div>

        <div onClick={handleLogout}
         className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer">
          <LogOut size={18} />
          <span>Logout</span>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
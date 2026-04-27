import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const MainLayout = ({ children }) => {

  // 🔥 GLOBAL USER //
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar*/}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col h-full">
        
        {/* Navbar (fixed) */}
        <div className="h-16 shrink-0">

          {/* 🔥 USER PASSING */}
          <Navbar user={user} />

        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default MainLayout;
import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ SAFE LOAD USER
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log("Navbar parse error:", err);
      setUser(null);
    }
  }, []);

  // 🔥 Profile Image Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🚨 SAFE SAVE (VERY IMPORTANT)
      if (res.data && res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
      } else {
        console.log("⚠ Invalid user response:", res.data);
      }

    } catch (err) {
      console.log(err);
      alert("Image upload failed ❌");
    }
  };

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
        <div className="flex items-center gap-3">
          
          {/* Hidden file input */}
          <input
            type="file"
            id="profileUpload"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Profile Image */}
          <img
            onClick={() =>
              document.getElementById("profileUpload").click()
            }
            src={
              user?.profilePic
                ? `http://localhost:5000${user.profilePic}?t=${Date.now()}`
                : "https://i.pravatar.cc/40"
            }
            alt="profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />

          {/* Name + Role */}
          <div
            className="leading-tight cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <p className="text-sm font-semibold">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.role || "Student"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Navbar;
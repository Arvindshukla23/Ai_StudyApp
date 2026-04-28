import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [file, setFile] = useState(null);

  // ✅ PREFILL USER DATA (IMPORTANT)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setFormData({
        name: storedUser.name || "",
        email: storedUser.email || "",
        role: storedUser.role || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("role", formData.role);

      if (file) {
        data.append("profilePic", file);
      }

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/user/update-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated User:", res.data.user);

      // ✅ SAVE UPDATED USER
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Profile Updated ✅");

      // 🔥 TEMP FIX (later we remove this)
      window.location.reload();

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-xl">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Student / Developer / Designer..."
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;
import React, { useEffect, useState } from "react";
import { Mail, Calendar, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stats, setStats] = useState({
    notes: 0,
    quizzes: 0,
    studyHours: 0,
    avgScore: 0,
  });

  // 🔥 fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data || {
          notes: 0,
          quizzes: 0,
          studyHours: 0,
          avgScore: 0,
        });

      } catch (err) {
        console.log("Stats error:", err);
      }
    };

    fetchStats();
  }, []);

  // initials
  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "U";

  return (
    <div className="p-6 space-y-6">

      {/* TOP PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-between items-center">

        <div className="flex items-center gap-6">

          {/* Avatar */}
          <div className="w-20 h-20 bg-blue-600 text-white flex items-center justify-center rounded-full text-2xl font-semibold">
            {initials}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-semibold">
              {user?.name || "User Name"}
            </h2>

            <div className="flex items-center gap-4 text-gray-500 mt-1 text-sm">

              <div className="flex items-center gap-1">
                <Mail size={14} />
                {user?.email || "example@mail.com"}
              </div>

              <div className="flex items-center gap-1">
                <Calendar size={14} />
                Joined Recently
              </div>

            </div>

            {/* STATS */}
            <div className="flex gap-4 mt-4">

              <StatBox
                title="Notes"
                value={stats.notes || 0}
                color="text-blue-600"
                bg="bg-blue-50"
              />

              <StatBox
                title="Study Sessions"
                value={stats.studyHours || 0}
                color="text-green-600"
                bg="bg-green-50"
              />

              <StatBox
                title="Quizzes"
                value={stats.quizzes || 0}
                color="text-purple-600"
                bg="bg-purple-50"
              />

              <StatBox
                title="Avg Score"
                value={`${stats.avgScore || 0}%`}
                color="text-orange-600"
                bg="bg-orange-50"
              />

            </div>

          </div>
        </div>

        <button
          onClick={() => navigate("/edit-profile")}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          <Settings size={16} />
          Edit Profile
        </button>

      </div>

      {/* MIDDLE SECTION */}
      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 bg-white rounded-2xl border p-6">

          <h3 className="font-semibold mb-4">Study Statistics</h3>

          <Progress
            label="Total Study Time"
            value={`${stats.studyHours || 0} hours`}
            percent={stats.studyHours || 0}
          />

          <Progress
            label="Notes Uploaded"
            value={`${stats.notes || 0} files`}
            percent={stats.notes || 0}
          />

          <Progress
            label="Quizzes Completed"
            value={stats.quizzes || 0}
            percent={stats.quizzes || 0}
          />

          <Progress
            label="Average Score"
            value={`${stats.avgScore || 0}%`}
            percent={stats.avgScore || 0}
          />

        </div>

        <div className="bg-white rounded-2xl border p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <p className="text-gray-400 text-sm">No activity yet</p>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 bg-white rounded-2xl border p-6">
          <h3 className="font-semibold mb-4">Achievements</h3>
          <p className="text-gray-400 text-sm">No achievements yet</p>
        </div>

        <div className="bg-white rounded-2xl border p-6">
          <h3 className="font-semibold mb-4">Weekly Goals</h3>

          <Progress label="Study Time" value="0/10 hours" percent={0} />
          <Progress label="Quizzes" value="0/5 completed" percent={0} />
          <Progress label="Notes Upload" value="0/7 files" percent={0} />

        </div>

      </div>

    </div>
  );
};

export default ProfilePage;

/* COMPONENTS */
const StatBox = ({ title, value, color, bg }) => (
  <div className={`p-4 rounded-xl ${bg} min-w-[100px]`}>
    <p className={`text-lg font-semibold ${color}`}>{value}</p>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

/* 🔥 FIXED PROGRESS COMPONENT */
const Progress = ({ label, value, percent }) => {
  const safe = Math.min(Math.max(percent || 0, 0), 100);

  return (
    <div className="mb-4">

      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-gray-500">{value}</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">

        {safe > 0 && (
          <div
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${safe}%` }}
          />
        )}

      </div>

    </div>
  );
};
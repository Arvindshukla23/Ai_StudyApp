import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StatCard";
import { FileText, Clock, Brain, TrendingUp } from "lucide-react";

const StatsSection = () => {

  const [stats, setStats] = useState({
    totalNotes: 0,
    studyHours: 0,
    quizzes: 0,
    progress: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/notes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const notes = res.data;

        setStats({
          totalNotes: notes.length,
          studyHours: notes.length * 1, // simple logic
          quizzes: 0,
          progress: notes.length * 10 > 100 ? 100 : notes.length * 10,
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 px-6 mt-6">

      <StatCard
        title="Total Notes"
        value={stats.totalNotes}
        icon={<FileText />}
        growth="+0%"
      />

      <StatCard
        title="Study Hours"
        value={`${stats.studyHours}h`}
        icon={<Clock />}
        growth="+0%"
      />

      <StatCard
        title="Quizzes"
        value={stats.quizzes}
        icon={<Brain />}
        growth="+0%"
      />

      <StatCard
        title="Progress"
        value={`${stats.progress}%`}
        icon={<TrendingUp />}
        growth="+0%"
      />

    </div>
  );
};

export default StatsSection;
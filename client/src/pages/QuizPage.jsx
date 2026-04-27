import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const QuizPage = () => {

  const { user } = useAuth();

  const [quizData, setQuizData] = useState({
    totalQuestions: 5,
    time: 10,
    passPercent: 70,
    topics: [],
    attempted: 0,
  });

  // 🔥 FETCH QUIZ DATA
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/quiz/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQuizData(res.data || quizData);

      } catch (err) {
        console.log("Quiz fetch error:", err);
      }
    };

    fetchQuizData();
  }, []);

  return (
    <div className="flex justify-center py-10">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl text-center">

        {/* Icon */}
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4"></div>

        <h2 className="text-2xl font-semibold mb-2">
          Ready to Test Your Knowledge {user?.name ? `, ${user.name}` : ""}?
        </h2>

        <p className="text-gray-500 mb-6">
          This quiz contains {quizData.totalQuestions} multiple-choice questions.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-xl font-bold">{quizData.totalQuestions}</p>
            <p className="text-sm text-gray-500">Questions</p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl">
            <p className="text-xl font-bold">~{quizData.time}</p>
            <p className="text-sm text-gray-500">Minutes</p>
          </div>

          <div className="bg-purple-100 p-4 rounded-xl">
            <p className="text-xl font-bold">{quizData.passPercent}%</p>
            <p className="text-sm text-gray-500">To Pass</p>
          </div>

        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">

          {quizData.topics.length > 0 ? (
            quizData.topics.map((t, i) => (
              <span
                key={i}
                className="bg-blue-100 px-3 py-1 rounded-full text-sm"
              >
                {t}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">
              No topics yet (Upload notes to generate quiz)
            </span>
          )}

        </div>

        {/* Progress */}
        <p className="text-sm text-gray-500 mb-4">
          Attempted: {quizData.attempted}
        </p>

        {/* Button */}
        <button className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700">
          Start Quiz →
        </button>

      </div>

    </div>
  );
};

export default QuizPage;
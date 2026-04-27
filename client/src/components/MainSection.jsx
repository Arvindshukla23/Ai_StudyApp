import React, { useEffect, useState } from "react";
import { FileText, Upload, MessageSquare, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainSection = () => {

  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
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

        setNotes(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 px-6 mt-6">

      {/* LEFT */}
      <div className="col-span-2 bg-white p-5 rounded-2xl border shadow-sm">

        <h2 className="text-lg font-semibold mb-4">Recent Uploads</h2>

        <div className="space-y-4">

          {notes.length === 0 ? (
            <p className="text-gray-400 text-sm">No uploads yet</p>
          ) : (
            notes.slice(0, 5).map((note) => (
              <div key={note._id} className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
                    <FileText size={18} />
                  </div>

                  <div>
                    <p className="font-medium">{note.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <span className="text-xs px-3 py-1 bg-gray-200 rounded-full">
                  {note.fileType?.split("/")[1]}
                </span>

              </div>
            ))
          )}

        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white p-5 rounded-2xl border shadow-sm">

        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="space-y-4">

          <button
            onClick={() => navigate("/upload")}
            className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-gray-50"
          >
            <Upload size={18} />
            Upload Notes
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-gray-50"
          >
            <MessageSquare size={18} />
            Start AI Chat
          </button>

          <button
            onClick={() => navigate("/quiz")}
            className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-gray-50"
          >
            <ClipboardList size={18} />
            Take Quiz
          </button>

        </div>
      </div>

    </div>
  );
};

export default MainSection;
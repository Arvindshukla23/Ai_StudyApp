import React, { useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    console.log("📤 Sending:", input);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/chat",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log("✅ RESPONSE:", res.data);

      setMessages((prev) => [
        ...prev,
        { type: "user", text: input },
        { type: "ai", text: res.data.reply },
      ]);

      setInput("");

    } catch (err) {
      console.log("❌ ERROR:", err);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full p-6">

      {/* Chat Messages */}
      <div className="flex flex-col gap-3 overflow-y-auto flex-1 mb-4">

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full pointer-events-none">
            {/* 🔥 pointer-events-none fix */}

            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4"></div>

            <h2 className="text-2xl font-semibold mb-2">
              How can I help you study today?
            </h2>

            <p className="text-gray-500 mb-6">
              Ask me anything about your coursework
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-xl ${
              msg.type === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}

      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // 🔥 Enter support
          placeholder="Ask me anything..."
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button" // 
          onClick={() => {
            console.log("BUTTON CLICKED");
            sendMessage();
          }}
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
        >
          ➤
        </button>
      </div>

    </div>
  );
};

export default ChatPage;
import React from "react";

const WelcomeText = ({ user }) => {
  return (
    <div className="px-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome back,{" "}
        <span className="text-black">
          {user?.name || "User"} 👋
        </span>
      </h1>

      <p className="text-gray-500 mt-1">
        Here’s what’s happening with your studies today.
      </p>
    </div>
  );
};

export default WelcomeText;
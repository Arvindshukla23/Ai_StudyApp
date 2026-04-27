import React from "react";

const StatCard = ({ title, value, icon, growth }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200">
      
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>

      {/* Value */}
      <h2 className="text-3xl font-bold text-gray-800 mt-4">
        {value}
      </h2>

      {/* Growth */}
      <p className="text-sm text-green-500 mt-1 font-medium">
        {growth} from last week
      </p>

    </div>
  );
};

export default StatCard;
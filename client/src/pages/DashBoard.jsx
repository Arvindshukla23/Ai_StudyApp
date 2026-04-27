import React from "react";
import WelcomeText from "../components/WelcomeText";
import StatsSection from "../components/StatsSection";
import MainSection from "../components/MainSection";

import { useAuth } from "../context/AuthContext";

const DashBoard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6">

      <WelcomeText user={user} />

      <StatsSection />
      <MainSection />

    </div>
  );
};

export default DashBoard;
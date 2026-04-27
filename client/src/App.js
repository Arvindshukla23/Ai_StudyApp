import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashBoard from "./pages/DashBoard";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import MainLayout from "./layouts/MainLayout";
import QuizPage from "./pages/QuizPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import SignupPage from "./pages/SignupPage";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <DashBoard />
              </MainLayout>
            }
          />

          <Route
            path="/upload"
            element={
              <MainLayout>
                <UploadPage />
              </MainLayout>
            }
          />

          <Route
            path="/chat"
            element={
              <MainLayout>
                <ChatPage />
              </MainLayout>
            }
          />

          <Route
            path="/quiz"
            element={
              <MainLayout>
                <QuizPage />
              </MainLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <MainLayout>
                <EditProfile />
              </MainLayout>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
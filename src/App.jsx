import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomeLayout from "./layout/HomeLayout";
import Settings from "./pages/Settings";
import ProtectedRoute from "./auth/ProtectedRoute";
import NewChat from "./pages/NewChat";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="landing" replace />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="new-chat" element={<NewChat />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

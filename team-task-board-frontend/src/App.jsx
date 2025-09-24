import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

// Components
import ProtectedRoute from "./components/ProtectedRoute";


// team Task project added to git. I will commit here
function App() {
  return (
    <Routes>
      {/* Default route → redirect to login */}
      
      <Route path="/" element={<LoginPage />} />

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard (protected) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

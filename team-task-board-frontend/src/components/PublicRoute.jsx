// src/components/PublicRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // optional spinner
  }

  if (token) {
    return <Navigate to="/dashboard" />; // already logged in → redirect
  }

  return children;
}

export default PublicRoute;

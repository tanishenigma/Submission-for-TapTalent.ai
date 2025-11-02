import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

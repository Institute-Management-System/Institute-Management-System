import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const userString = sessionStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    // Check if user is logged in
    if (!user || !user.token) {
        return <Navigate to="/login" replace />;
    }

    // Check for allowed roles if specified
    if (allowedRoles && allowedRoles.length > 0) {
        // Backend roles are like ["ROLE_STUDENT", "ROLE_ADMIN"]
        const userRoles = user.roles || [];

        // Check if user has at least one of the allowed roles
        const hasRole = allowedRoles.some(role => userRoles.includes(role));

        if (!hasRole) {
            // User is logged in but doesn't have permission
            // Could redirect to a "Unauthorized" page, or back to login
            return <Navigate to="/login" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;

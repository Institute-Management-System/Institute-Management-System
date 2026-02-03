import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const userString = sessionStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user || !user.token) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }

    if (!user.roles || !user.roles.includes("ROLE_ADMIN")) {
        // Logged in but not admin. 
        // Note: Backend roles are ROLE_ADMIN, but frontend might check check 'admin' or ROLE_ADMIN depending on how it was stored.
        // AuthController stores: roles: ["ROLE_STUDENT"] etc.
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;

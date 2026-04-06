import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
        if (!token) {
            // Save the intended route for redirect after login
            localStorage.setItem('redirectAfterLogin', location.pathname);
            toast.info("Please login to access this section", {
                toastId: 'auth-required' // Prevent duplicate toasts
            });
        }
    }, [token, location.pathname]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

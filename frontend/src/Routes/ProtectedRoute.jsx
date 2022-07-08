import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../Context/Auth';

export const ProtecedRoute = ({children}) => {
    const auth = useAuth();
    if (!auth.logedIn.logedIn) return <Navigate to="/login" />;
    return children;
};
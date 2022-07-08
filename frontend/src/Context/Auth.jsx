import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logedIn, setLogedIn] = useState({ logedIn: false, user: '' });
  const value = useMemo(() => ({ logedIn, setLogedIn }), [logedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
}

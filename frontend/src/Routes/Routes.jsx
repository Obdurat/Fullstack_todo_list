import React from "react";
import { Route, Routes as Switch } from 'react-router-dom';
import { Login, Profile, Task, CreateUser, Home, ForgotPass } from "../Pages";
import { ProtecedRoute } from "./ProtectedRoute";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" element={<Login />} />      
      <Route path="/task" element={<ProtecedRoute><Task /></ProtecedRoute>} />
      <Route path="/profile" element={<ProtecedRoute><Profile /></ProtecedRoute>} />
      <Route path="/register" element={<CreateUser />} />
      <Route path="/" element={<Home />} />
      <Route path="/forgotpass" element={<ForgotPass />} />
    </Switch>
  );
};

export default Routes;

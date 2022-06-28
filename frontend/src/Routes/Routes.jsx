import React from "react";
import { Route, Routes as Switch } from 'react-router-dom';
import { Login, Profile, Task, CreateUser } from "../Pages";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Login />} />
      <Route path="/task" element={<Task />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<CreateUser />} />
    </Switch>
  );
};

export default Routes;

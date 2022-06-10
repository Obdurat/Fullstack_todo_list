import React from "react";
import { Route, Routes as Switch } from 'react-router-dom';
import Login from '../Pages/LogIn/Login'
import Task from "../Pages/Task/Task";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Login />} />
      <Route path="/task" element={<Task />} />
    </Switch>
  );
};

export default Routes;

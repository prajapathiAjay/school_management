import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import HeaderWithSidebar from "../Layouts/HeaderWithSidebar";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp";
import { privateRoutes } from "./RouterLinks";
const MainRoutes = () => {








  return (
    <>
      <Routes>
      {privateRoutes.map((route,index)=>(<Route path={route.path} element={route.component}/>))}
      </Routes>
    </>
  );
};

export default MainRoutes;




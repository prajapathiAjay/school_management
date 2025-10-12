import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import HeaderWithSidebar from "../Layouts/HeaderWithSidebar";
const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderWithSidebar/>} />
      </Routes>
    </>
  );
};

export default MainRoutes;




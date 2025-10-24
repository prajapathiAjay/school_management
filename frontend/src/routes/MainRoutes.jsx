import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import HeaderWithSidebar from "../Layouts/HeaderWithSidebar";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp";
import Layout from "../Layouts/Layout";
import { privateRoutes } from "./RouterLinks";
const MainRoutes = () => {





  const renderLayout=(route)=>{
  switch(route?.display){


    case"full":return <Layout>{route?.element}</Layout>;
    case"individually":return <>{route?.element}</>;
    default:return route?.element;
  }




  }


  return (
    <>
      <Routes>
      {privateRoutes?.map((route,index)=>(<Route path={route?.path} element={ renderLayout(route)}/>))}
      </Routes>
    </>
  );
};

export default MainRoutes;




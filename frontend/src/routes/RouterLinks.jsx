import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import { Navigate } from "react-router-dom";
import { allRoutes } from "./AllRoutes";

export const privateRoutes = [
  {icon:"home",path:"/",component:<Navigate to={allRoutes.login} replace />},
  {icon: "dashboard", path: allRoutes.dashboard, component: <Dashboard /> },
  {icon:"login",path:allRoutes.login,component:<Login/>}

];

export const publicRoutes = [
  {icon:"home",path:"/",component:<Navigate to={allRoutes.login} replace />},
  {icon:"login",path:allRoutes.login,component:<Login/>}
];
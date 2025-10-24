import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import { Navigate } from "react-router-dom";
import { allRoutes } from "./AllRoutes";

export const privateRoutes = [
  {
    label:"Login",
    icon: "home",
    path: "/",
    element: <Navigate to={allRoutes.login} replace />,
    display: "individaully",
  },
  {
    label:"Dashboard",
    icon: "dashboard",
    path: allRoutes.dashboard,
    element: <Dashboard />,
    display: "full",
  },
  {
    label:"Login",
    icon: "login",
    path: allRoutes.login,
    element: <Login />,
    display: "individually",
  },
];

// export const publicRoutes = [
//   {icon:"home",path:"/",component:<Navigate to={allRoutes.login} replace />},
//   {icon:"login",path:allRoutes.login,component:<Login/>}
// ];

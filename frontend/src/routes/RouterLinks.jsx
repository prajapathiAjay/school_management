import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import { Navigate } from "react-router-dom";
import { allRoutes } from "./AllRoutes";
import NotFound from "../Layouts/NotFound";

export const privateRoutes = [
  {

    path: "/",
    element: <Navigate to={allRoutes.login} replace />,
    display: "individaully",
  },
  {
    path: allRoutes.dashboard,
    element: <Dashboard />,
    display: "full",
  },
  {
    path: allRoutes.login,
    element: <Login />,
    display: "individually",
  },
  {
    path: "*",
    element: <NotFound />,
    display: "individually",
  },
];

// export const publicRoutes = [
//   {icon:"home",path:"/",component:<Navigate to={allRoutes.login} replace />},
//   {icon:"login",path:allRoutes.login,component:<Login/>}
// ];

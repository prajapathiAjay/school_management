import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import { Navigate } from "react-router-dom";
import { allRoutes } from "./AllRoutes";
import { Home, Users, Book, Settings } from "lucide-react";

export const sidebarData = [
  // {
  //   label:"Login",
  //   icon: "home",
  //   path: "/",
  //   element: <Navigate to={allRoutes.login} replace />,
  //   display: "individaully",
  // },
  {
    title:"Main",
    icon: "dashboard",
    path: allRoutes.dashboard,
    menuList:[{label:"Home",path:allRoutes.dashboard,icon:  <Users size={20} />,
        element:<Dashboard/>}],
    display: "full",
  },
  // {
  //   label:"Login",
  //   icon: "login",
  //   path: allRoutes.login,
  //   element: <Login />,
  //   display: "individually",
  // },
  {title:"Peoples",
    menuList:[
      {label:"Students",path:"/students",icon: <Book size={20} />},
      {label:"Teachers",path:"/teachers",icon: <Book size={20} />},
    ]
  }
];

// export const publicRoutes = [
//   {icon:"home",path:"/",component:<Navigate to={allRoutes.login} replace />},
//   {icon:"login",path:allRoutes.login,component:<Login/>}
// ];

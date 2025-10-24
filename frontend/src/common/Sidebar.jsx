import React, { useState } from "react";
import { ChevronUp } from "react-feather";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import awnLogo from "../assets/react.svg";
import toggleIcon from "../assets/react.svg";
import accountSettings from "../assets/react.svg";
import { privateRoutes } from "../routes/RouterLinks";
import { sidebarData } from "../routes/SidebarData";

// const sidebarData = [
//   {
//     title: "Dashboard",
//     alwaysExpanded: false,
//     menuList: [
//       { label: "Home", link: "/home", icon: toggleIcon, iconActive: toggleIcon },
//       { label: "Reports", link: "/reports", icon: toggleIcon, iconActive: toggleIcon },
//     ],
//   },
//   {
//     title: "Management",
//     alwaysExpanded: false,
//     menuList: [
//       { label: "Users", link: "/users", icon: toggleIcon, iconActive: toggleIcon },
//       { label: "Tickets", link: "/tickets", icon: toggleIcon, iconActive: toggleIcon },
//     ],
//   },
// ];

const Sidebar = ({ toggleSidebar, isCollapsed }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({});

  const basePath = location.pathname.split("/")[1];

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div
      className={`flex flex-col bg-white shadow-md transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <img src={awnLogo} alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Sidebar Menu */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <div className="flex justify-end mb-4">
          <img
            src={toggleIcon}
            alt="Toggle Sidebar"
            className="w-6 h-6 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>

        {sidebarData.map((section) => (
          <div key={section.title} className="mb-2">
            {/* Section Header */}
            <div
              className={`flex items-center justify-between px-2 py-2 font-semibold rounded hover:bg-gray-100 cursor-pointer ${
                isCollapsed ? "justify-center" : ""
              }`}
              onClick={() => !isCollapsed && toggleSection(section.title)}
            >
              <span className={`${isCollapsed ? "hidden" : "block"}`}>
                {section.title}
              </span>
              {!isCollapsed && (
                <motion.div
                  initial={false}
                  animate={{ rotate: expandedSections[section.title] ? 0 : 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronUp size={18} />
                </motion.div>
              )}
            </div>

            {/* Menu Items */}
            {(!isCollapsed && expandedSections[section.title] !== false) &&
              section.menuList.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition ${
                    basePath === item.path.split("/")[1] ? "bg-blue-100 font-medium" : ""
                  }`}
                >
                  <img
                    src={
                      basePath === item.path.split("/")[1] ? item.iconActive : item.icon
                    }
                    alt="icon"
                    className="w-5 h-5"
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
          </div>
        ))}
      </div>

      {/* Account Settings */}
      <Link
        to="/"
        className={`flex items-center gap-2 px-4 py-2 border-t border-gray-200 hover:bg-gray-100 transition ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <img src={accountSettings} alt="Settings" className="w-5 h-5" />
        {!isCollapsed && <span>Account Settings</span>}
      </Link>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex  bg-gray-50">
      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} layoutType="full" />

        {/* Page Content */}
        {/* <main
          className={`flex-1 p-6 transition-all duration-300 ${
            isCollapsed ? "ml-20" : "ml-64"
          }`}
        > */}
         <main
          className={`flex-1 p-6 transition-all duration-300`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

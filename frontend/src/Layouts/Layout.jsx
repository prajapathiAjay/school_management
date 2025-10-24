
import React, { useState } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          isCollapsed={isCollapsed}
          layoutType="full"
        />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

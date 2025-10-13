import React, { useState, useEffect } from 'react';
import Dashboard from '../Pages/Dashboard/Dashboard';

const HeaderWithSidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Remove the scroll effect for sidebar shrinking
  // We'll only keep the manual toggle functionality

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Sample sidebar menu items
  const menuItems = [
    { id: 1, name: 'Dashboard', icon: '📊', href: '#' },
    { id: 2, name: 'Students', icon: '👨‍🎓', href: '#' },
    { id: 3, name: 'Teachers', icon: '👩‍🏫', href: '#' },
    { id: 4, name: 'Classes', icon: '🏫', href: '#' },
    { id: 5, name: 'Attendance', icon: '📅', href: '#' },
    { id: 6, name: 'Grades', icon: '📝', href: '#' },
    { id: 7, name: 'Schedule', icon: '⏰', href: '#' },
    { id: 8, name: 'Library', icon: '📚', href: '#' },
    { id: 9, name: 'Sports', icon: '⚽', href: '#' },
    { id: 10, name: 'Events', icon: '🎉', href: '#' },
    { id: 11, name: 'Reports', icon: '📈', href: '#' },
    { id: 12, name: 'Settings', icon: '⚙️', href: '#' },
  ];

  // Determine sidebar width based on toggle state only
  const getSidebarWidth = () => {
    return isSidebarCollapsed ? 'w-20' : 'w-64';
  };

  const getMainContentMargin = () => {
    return isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed at top */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle Button for Desktop */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <span className="text-xl">☰</span>
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                School Management
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold">AD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex pt-16 h-screen">
        {/* Sidebar - Fixed and non-scrollable */}
        <aside className={`
          fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg z-30 
          transition-all duration-300 ease-in-out
          ${getSidebarWidth()}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
          {/* Sidebar Content */}
          <div className="p-4 h-full flex flex-col">
            {/* Toggle Button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Desktop Toggle Button inside Sidebar */}
            <div className="hidden lg:flex justify-end mb-4">
              <button
                onClick={toggleSidebar}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <span className={`transform transition-transform duration-300 ${
                  isSidebarCollapsed ? 'rotate-180' : ''
                }`}>
                  ←
                </span>
              </button>
            </div>

            {/* Navigation Menu - Scrollable if needed */}
            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`
                        flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                        hover:bg-blue-50 hover:text-blue-600 text-gray-700 group relative
                        ${isSidebarCollapsed ? 'justify-center' : ''}
                      `}
                      title={isSidebarCollapsed ? item.name : ''}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {!isSidebarCollapsed && (
                        <span className="font-medium">{item.name}</span>
                      )}
                      {/* Tooltip for collapsed state */}
                      {isSidebarCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Additional Info (only show when not collapsed) */}
            {!isSidebarCollapsed && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Quick Stats</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Students: 1,250</div>
                  <div>Teachers: 68</div>
                  <div>Classes: 45</div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area - Scrollable */}
        <main className={`
          flex-1 transition-all duration-300 ease-in-out h-full overflow-auto
          ${getMainContentMargin()}
          ${isSidebarOpen ? 'ml-0' : 'ml-0'}
        `}>
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden fixed bottom-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            ☰
          </button>

          {/* Page Content - Dashboard takes full remaining space and is scrollable */}
          <div className="w-full min-h-full">
            <Dashboard />
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default HeaderWithSidebar;
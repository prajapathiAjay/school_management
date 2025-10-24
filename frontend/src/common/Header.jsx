import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,          // replaces toggleIcon
  Layers,        // replaces actionIcon
  Bell,          // replaces notification
  Globe,         // replaces languageIcon
  UserCircle,    // replaces profileIcon
  ChevronDown,   // replaces downIcon
} from "lucide-react";

// import ActionItemsModal from "./ActionItemsModal.jsx";
// import NotificationsModal from "./Notifications.jsx";

const Header = ({ toggleSidebar, isCollapsed }) => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isModulesModalOpen, setIsModulesModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const currentUser = { firstName: "Ajay", lastName: "Prajapathi" };
  const notificationCount = 3;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => navigate("/login");
  const handleChangePassword = () => navigate("/forgot-password");

  return (
    <header className="flex items-center justify-between bg-white shadow px-4 h-16">
      {/* Left */}
      <div className="flex items-center gap-4">
        {toggleSidebar && (
          <Menu
            size={24}
            className="cursor-pointer text-gray-700"
            onClick={toggleSidebar}
          />
        )}
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition">
          <Layers size={20} className="text-gray-600" />
          <span className="text-sm font-medium">Ticket Management System</span>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <Bell
            size={22}
            className="cursor-pointer text-gray-700"
            onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
          />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
              {notificationCount}
            </span>
          )}
        </div>

        {/* Language */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Globe size={20} className="text-gray-700" />
        </button>

        {/* User Info */}
        <div className="hidden sm:flex flex-col text-right">
          <p className="text-xs text-gray-500">Welcome</p>
          <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
            {`${currentUser.firstName} ${currentUser.lastName}`}
          </p>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center gap-2"
          >
            <UserCircle size={32} className="text-gray-700" />
            <ChevronDown size={18} className="text-gray-600" />
          </button>

          {profileDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
              <button
                onClick={handleChangePassword}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {/* {isModulesModalOpen && (
        <ActionItemsModal
          isOpen={isModulesModalOpen}
          onClose={() => setIsModulesModalOpen(false)}
        />
      )}
      {isNotificationModalOpen && (
        <NotificationsModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
        />
      )} */}
    </header>
  );
};

export default Header;

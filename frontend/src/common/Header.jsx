import React, { useState } from 'react';
import { 
  BellIcon, 
  UserCircleIcon, 
  ChevronDownIcon,
  Bars3Icon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const schoolInfo = {
    name: "Greenwood High School",
    logo: "/logo.png", // Replace with actual logo path
    academicYear: "2024-2025"
  };

  const user = {
    name: "Sarah Johnson",
    role: "Administrator",
    avatar: "/avatar.jpg" // Replace with actual avatar path
  };

  const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Students', href: '#', current: false },
    { name: 'Teachers', href: '#', current: false },
    { name: 'Classes', href: '#', current: false },
    { name: 'Attendance', href: '#', current: false },
    { name: 'Grades', href: '#', current: false },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top Bar */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo and School Info */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Logo and School Name */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-8"
                  src={schoolInfo.logo}
                  alt={`${schoolInfo.name} logo`}
                />
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    {schoolInfo.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Academic Year: {schoolInfo.academicYear}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Section - Navigation (Desktop) */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  item.current
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Section - Search, Notifications, User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-48 rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                className="flex items-center space-x-3 text-sm focus:outline-none"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar}
                        alt={`${user.name} avatar`}
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Help & Support
                    </a>
                    <hr className="my-1" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  item.current
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
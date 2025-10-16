import { createContext, useState, useEffect } from "react";

export const PermissionContext = createContext({
  permissions: [],
  updatePermissions: () => {},
  clearPermissions: () => {},
});

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(() => {
    try {
      const storedPermissions = localStorage.getItem("permissions");
      return storedPermissions ? JSON.parse(storedPermissions) : [];
    } catch (error) {
      console.error("Failed to load permissions from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("permissions", JSON.stringify(permissions));
    } catch (error) {
      console.error("Failed to save permissions to localStorage", error);
    }
  }, [permissions]);

  const updatePermissions = (newPermissions) => {
    setPermissions(newPermissions);
  };

  const clearPermissions = () => {
    setPermissions([]);
    localStorage.removeItem("permissions");
  };

  return (
    <PermissionContext.Provider
      value={{ permissions, updatePermissions, clearPermissions }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

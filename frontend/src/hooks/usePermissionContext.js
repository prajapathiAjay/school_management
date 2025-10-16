import { useContext } from "react";
import { PermissionContext } from "../context/PermissionContext.jsx";

const usePermissionContext = () => useContext(PermissionContext);
export default usePermissionContext;

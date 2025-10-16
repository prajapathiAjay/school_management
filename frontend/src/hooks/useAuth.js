import { useContext } from "react";
import { AuthContext } from "../context/Auth.jsx";

const useAuth = () => useContext(AuthContext);
export default useAuth;

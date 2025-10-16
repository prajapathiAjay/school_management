import { useContext } from "react";
import { ConfigContext } from "../context/Config.jsx";

const useConfig = () => useContext(ConfigContext);
export default useConfig;

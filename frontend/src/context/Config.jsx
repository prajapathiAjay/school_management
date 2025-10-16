import React, { createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

let initialState = {};

const ConfigContext = createContext({
  ...initialState,
});

const getConfig = () => {
  axios
    .get("config/appConfig.json")
    .then((res) => {
      let appConfig = res.data;
      initialState = appConfig;
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};
getConfig();

ConfigProvider.propTypes = {
  children: PropTypes.node,
};

function ConfigProvider({ children }) {
  return (
    <ConfigContext.Provider
      value={{
        ...initialState,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigContext, ConfigProvider };

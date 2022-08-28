import React, { useState, useContext, createContext } from "react";

const useAlertContext = createContext();

export function ProvideAlert({ children }) {
  const alert = useProvideAlert();
  return <useAlertContext.Provider value={alert}>{children}</useAlertContext.Provider>;
}

export const useAlert = () => {
  return useContext(useAlertContext);
};

function useProvideAlert() {
  const [alerts, setAlerts] = useState([]);

  const createAlert = newAlert =>{
    setAlerts([...alerts,newAlert]);
  }

  return {
    alerts,
    createAlert
  };
}
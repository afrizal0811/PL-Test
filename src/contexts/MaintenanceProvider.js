import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import LoaderFullScreen from "../components/LoaderFull";
import { AuthContext } from "./JWTContext";

const API_URL = process.env.REACT_APP_DOMAIN_API;

const MaintenanceContext = createContext(null);

const getAuthMaintenance = async () => {
  try {
    const response = await axios.get(API_URL + "/Auth/Maintenance");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const useMaintenance = () => useContext(MaintenanceContext);

const MaintenanceProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(null);

  const authState = useContext(AuthContext);
  const roleName =
    authState?.user?.roleName ?? window.localStorage.getItem("roleName");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const isMaintenance = (await getAuthMaintenance()).isMaintenance;
      setIsLoading(false);
      setIsMaintenance(isMaintenance);
    })();
  }, []);

  const value = useMemo(
    () => ({ isMaintenance, isLoadingGetMaintenance: isLoading }),
    [isMaintenance, isLoading]
  );

  if (isLoading) return <LoaderFullScreen />;

  if (isMaintenance && roleName !== "Super Admin") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("branch");
    localStorage.removeItem("branches");
    localStorage.removeItem("userName");
    localStorage.removeItem("employeeName");
    localStorage.removeItem("roleName");
    localStorage.removeItem("employeeID");
    localStorage.removeItem("expFE");
  }

  return (
    <MaintenanceContext.Provider value={value}>
      {children}
    </MaintenanceContext.Provider>
  );
};

export default MaintenanceProvider;

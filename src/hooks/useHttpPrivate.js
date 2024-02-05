import { useEffect } from "react";
import http from "../http";
import useAuth from "./useAuth";
import useLogout from "./useLogout";
import useOrganism from "./useOrganism";

const useHttpPrivate = () => {
  const { authState } = useAuth();
  const logout = useLogout();
  const { selectedOrganism } = useOrganism();

  useEffect(() => {
    const reqint = http.interceptors.request.use(
      (config) => {
        const authHeader = config.headers["Authorization"];
        const customOrgHeader = config.headers["x-idorganismesecondaire"];
        if (!authHeader) {
          config.headers["Authorization"] = `Bearer ${authState?.accessToken}`;
        }
        if (!customOrgHeader) {
          config.headers["x-idorganismesecondaire"] = selectedOrganism.id;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // attach response interceptor
    const resint = http.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequestConfig = error?.config;
        if (
          (error?.response?.status === 401 || error?.response?.status === 403) &&
          !previousRequestConfig.sent
        ) {
          logout();
        } else {
          console.error(error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      http.interceptors.request.eject(reqint);
      http.interceptors.response.eject(resint);
    };
  }, [authState.accessToken, selectedOrganism, logout]);

  return http;
};

export default useHttpPrivate;

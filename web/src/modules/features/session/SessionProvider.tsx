import { FC, useState, useMemo, useLayoutEffect } from "react";

import { SessionContext } from "./session.context";
import { ISession } from "./session.types";

import { request } from "../../common/request";

export const SessionProvider: FC = ({ children }) => {
  const s = localStorage.getItem("session");

  const [session, setSession] = useState<ISession | null>(
    s ? JSON.parse(s) : null
  );

  const value = useMemo(() => {
    return { session, setSession };
  }, [session, setSession]);

  useLayoutEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    } else {
      localStorage.removeItem("session");
    }

    const requestInterceptor = request.interceptors.request.use((config) => {
      if (session && config && config.headers) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
      return config;
    });

    const responseInterceptor = request.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          setSession(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      request.interceptors.request.eject(requestInterceptor);
      request.interceptors.response.eject(responseInterceptor);
    };
  }, [session]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

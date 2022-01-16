import { createContext, useContext } from "react";
import { ISession } from "./session.types";

export type ISessionContextValue = {
  session: ISession | null;
  setSession: React.Dispatch<React.SetStateAction<ISession | null>>;
};

export const SessionContext = createContext<ISessionContextValue | null>(null);

export const useSession = () => {
  const value = useContext(SessionContext);

  if (value === null) {
    throw new Error("No provider for SessionContext");
  }

  return value;
};

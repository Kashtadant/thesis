import { request } from "../../common/request";
import { ISession } from "./session.types";

export const signin = (email: string, password: string) => {
  return request.post<ISession>("/api/auth/login", { email, password });
};

export const signup = (email: string, password: string, full_name: string) => {
  return request.post<ISession>("/api/auth/register", {
    email,
    password,
    full_name,
    position: "Сотрудник",
  });
};

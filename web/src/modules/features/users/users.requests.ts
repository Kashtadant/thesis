import { request } from "../../common/request";
import { IUser } from "./users.types";

export const getCurrentUser = () => {
  return request.get<{ data: IUser }>("/api/user").then((r) => r.data.data);
};

export const getUsers = () => {
  return request.get<{ data: IUser[] }>("/api/users").then((r) => r.data.data);
};

import { request } from "../../common/request";
import { IRoom } from "./rooms.types";

export const getRooms = () => {
  return request
    .get<{ data: IRoom[] }>("/api/user/rooms")
    .then((r) => r.data.data);
};

export const getRoom = (id: number) => {
  return request
    .get<{ data: IRoom }>(`/api/rooms/${id}`)
    .then((r) => r.data.data);
};

export const createRoom = (name: string) => {
  return request
    .post<{ data: IRoom }>("/api/rooms", { name })
    .then((r) => r.data.data);
};

export const updateRoomUsers = (id: number, members: number[]) => {
  return request
    .post<{ data: IRoom }>(`/api/rooms/${id}/users`, {
      members: JSON.stringify(members),
    })
    .then((r) => r.data.data);
};

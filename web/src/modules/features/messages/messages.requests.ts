import { request } from "../../common/request";
import { IMessage } from "./messages.types";

export const getMessages = (roomId: number) => {
  return request
    .get<{ data: IMessage[] }>(`/api/rooms/${roomId}/messages`)
    .then((r) => r.data.data);
};

export const createMessage = (room_id: number, text: string) => {
  return request
    .post<{ data: IMessage }>("/api/messages", {
      type: "message",
      text,
      room_id,
    })
    .then((r) => r.data.data);
};

export const createPoll = (
  room_id: number,
  text: string,
  participants: number[]
) => {
  return request
    .post<{ data: IMessage }>("/api/messages", {
      type: "poll",
      text,
      room_id,
      participants: JSON.stringify(participants),
      votes: JSON.stringify({ accepted: [], declined: [] }),
    })
    .then((r) => r.data.data);
};

export const accept = (id: number) => {
  return request
    .get<{ data: IMessage }>(`/api/messages/${id}/accept`)
    .then((r) => r.data.data);
};

export const decline = (id: number) => {
  return request
    .get<{ data: IMessage }>(`/api/messages/${id}/decline`)
    .then((r) => r.data.data);
};

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
  participants: number[],
  file: File
) => {
  const formData = new FormData();
  formData.append("type", "poll");
  formData.append("text", text);
  formData.append("room_id", room_id.toString());
  formData.append("participants", JSON.stringify(participants));
  formData.append("votes", JSON.stringify({ accepted: [], declined: [] }));
  formData.append("file", file);

  return request
    .post<{ data: IMessage }>("/api/messages", formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
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

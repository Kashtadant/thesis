import { IFile } from "../files";

export interface IBaseMessage {
  id: number;
  text: string;
  user_id: number;
  file?: IFile;
}

export interface ITextMessage extends IBaseMessage {
  type: "message";
}

export interface IPollMessage extends IBaseMessage {
  type: "poll";
  participants: number[];
  votes: {
    accepted: number[];
    declined: number[];
  };
  result: null;
}

export interface IResultMessage extends IBaseMessage {
  type: "result";
}

export type IMessage = ITextMessage | IPollMessage | IResultMessage;

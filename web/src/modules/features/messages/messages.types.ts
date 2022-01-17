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

export interface IDownloadMessage extends IBaseMessage {
  type: "download";
}

export type IMessage = ITextMessage | IPollMessage | IDownloadMessage;

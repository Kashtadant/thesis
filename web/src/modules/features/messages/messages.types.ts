export interface IBaseMessage {
  id: number;
  text: string;
  user_id: number;
  file?: {
    name: string;
    url: string;
  };
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

export type IMessage = ITextMessage | IPollMessage;

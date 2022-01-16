import { IUser } from "../users";

export interface IRoom {
  id: number;
  name: string;
  members: IUser[];
}

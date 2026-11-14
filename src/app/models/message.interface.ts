import { MessageType } from "./message-type";

export interface Message {
  id: number;
  type: MessageType;
  text: string;
}
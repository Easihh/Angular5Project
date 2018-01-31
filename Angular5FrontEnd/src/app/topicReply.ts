import { User } from "./user";

export interface TopicReply {
     id: number;
     createdBy: User;
     replyComment: string;
     timestamp: string;
}

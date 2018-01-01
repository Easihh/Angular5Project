import { TopicReply } from "./topicReply";
/* Wrapper Class that returns the Replies that are available
 * on the current page and the total number of replies on the topic
 * for pagination purpose on the client.
 */
export class TopicReplyWrapper {
    constructor(
        public topicTitle:string,
        public repliesCount:number,
        public topicReplies:TopicReply[]
    ) {}
}

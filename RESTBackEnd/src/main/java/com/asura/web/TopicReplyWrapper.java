package com.asura.web;

import java.util.List;

/* Wrapper Class that returns the Replies that are available
 * on the current page and the total number of replies on the topic
 * for pagination purpose on the client.
 */
public class TopicReplyWrapper {

	private long repliesCount;

	private List<TopicReply> topicReplies;

	public TopicReplyWrapper(int count, List<TopicReply> repliesLst) {
		this.repliesCount = count;
		this.topicReplies = repliesLst;
	}
	
	public long getRepliesCount() {
		return repliesCount;
	}

	public List<TopicReply> getTopicReplies() {
		return topicReplies;
	}
}

package com.asura.web.entity;

import java.util.List;

/* Wrapper Class that returns the Replies that are available
 * on the current page and the total number of replies on the topic
 * for pagination purpose on the client.
 */
public class TopicReplyWrapper {

	private long repliesCount;
	
	private String topicTitle;

	private List<TopicReply> topicReplies;
	
	private boolean topicIsLocked;

	public TopicReplyWrapper(int count, List<TopicReply> repliesLst, String title, boolean topicIsLocked) {
		this.repliesCount = count;
		this.topicReplies = repliesLst;
		this.topicTitle = title;
		this.topicIsLocked = topicIsLocked;
	}
	
	public long getRepliesCount() {
		return repliesCount;
	}

	public List<TopicReply> getTopicReplies() {
		return topicReplies;
	}
	
	public String getTopicTitle() {
		return topicTitle;
	}
	
	public boolean isTopicIsLocked() {
		return topicIsLocked;
	}
}

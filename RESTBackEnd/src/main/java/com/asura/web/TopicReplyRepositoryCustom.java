package com.asura.web;

import java.util.List;

public interface TopicReplyRepositoryCustom {
	
	List<TopicReply> getPagedTopicRepliesByTopicId(long topicId, int pageNumber);
	
	int getTotalTopicRepliesByTopicId(long topicId);
}

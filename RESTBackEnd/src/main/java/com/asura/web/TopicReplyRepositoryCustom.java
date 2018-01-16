package com.asura.web;

import java.util.List;

import com.asura.web.entity.TopicReply;

public interface TopicReplyRepositoryCustom {
	
	List<TopicReply> getPagedTopicRepliesByTopicId(long topicId, int pageNumber);
	
	int getTotalTopicRepliesByTopicId(long topicId);
}

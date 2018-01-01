package com.asura.web;

import java.util.List;

public interface TopicReplyRepositoryCustom {
	
	List<TopicReply> getTopicRepliesByTopicIds(long topicId,int pageNumber);
}

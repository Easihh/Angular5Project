package com.asura.web;

import java.util.List;

import com.asura.web.entity.Topic;

public interface TopicRepositoryCustom {
	
	List<Topic> getTopicByPageOrderByLastUpdated(int pageNumber,long forumId);
}

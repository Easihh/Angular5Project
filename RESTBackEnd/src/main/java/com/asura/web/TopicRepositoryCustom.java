package com.asura.web;

import java.util.List;

public interface TopicRepositoryCustom {
	
	List<Topic> getTopicByPageOrderByLastUpdated(int pageNumber);
}

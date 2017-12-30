package com.asura.web;

import java.util.List;

public interface TopicRepositoryCustom {
	
	List<Topic> getTopicByIdsOrderByLastUpdated(int pageNumber);
}

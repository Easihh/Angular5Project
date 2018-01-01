package com.asura.web;

import org.springframework.data.repository.CrudRepository;

public interface TopicReplyRepository extends CrudRepository<TopicReply, Long> , TopicReplyRepositoryCustom{
	
}

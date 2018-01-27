package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.TopicReply;
import com.asura.web.repository.custom.TopicReplyRepositoryCustom;

public interface TopicReplyRepository extends CrudRepository<TopicReply, Long> , TopicReplyRepositoryCustom{
	
}

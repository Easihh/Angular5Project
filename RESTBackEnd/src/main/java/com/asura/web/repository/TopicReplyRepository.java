package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.TopicReply;

public interface TopicReplyRepository extends CrudRepository<TopicReply, Long> , TopicReplyRepositoryCustom{
	
}

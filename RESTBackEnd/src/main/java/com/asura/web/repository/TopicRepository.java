package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.Topic;

public interface TopicRepository extends CrudRepository<Topic, Long>, TopicRepositoryCustom {

}

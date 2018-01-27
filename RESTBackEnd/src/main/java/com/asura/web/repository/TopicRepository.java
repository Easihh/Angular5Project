package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.Topic;
import com.asura.web.repository.custom.TopicRepositoryCustom;

public interface TopicRepository extends CrudRepository<Topic, Long>, TopicRepositoryCustom {

}

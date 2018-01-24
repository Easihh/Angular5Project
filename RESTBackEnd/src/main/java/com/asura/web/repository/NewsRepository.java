package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.News;

public interface NewsRepository extends CrudRepository<News, Long> , NewsRepositoryCustom{
	
}

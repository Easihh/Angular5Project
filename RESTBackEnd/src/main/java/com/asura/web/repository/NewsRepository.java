package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.News;
import com.asura.web.repository.custom.NewsRepositoryCustom;

public interface NewsRepository extends CrudRepository<News, Long> , NewsRepositoryCustom{
	
}

package com.asura.web.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.asura.web.entity.News;

public class NewsRepositoryImpl implements NewsRepositoryCustom{
	
	@PersistenceContext 
	private EntityManager em;
	
	@Override
	public List<News> getAllNews() {
		TypedQuery<News> query = em.createNamedQuery("News.findAllByOrderDesc", News.class);
		List<News> retVal = query.getResultList();
		return retVal;
	}
}

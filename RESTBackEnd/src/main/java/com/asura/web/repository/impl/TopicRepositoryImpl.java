package com.asura.web.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.asura.web.entity.Topic;
import com.asura.web.repository.custom.TopicRepositoryCustom;

public class TopicRepositoryImpl implements TopicRepositoryCustom{
	
	private final int topicsPerPage = 5;

	@PersistenceContext 
	private EntityManager em;
	
	@Override
	public List<Topic> getTopicByPageOrderByLastUpdated(int pageNumber,long forumId) {
		TypedQuery<Topic> query = em.createNamedQuery("Topic.findOrderByLastUpdate", Topic.class);
		query.setParameter("forumId", forumId);
		query.setFirstResult((topicsPerPage * pageNumber) - topicsPerPage);
		query.setMaxResults(topicsPerPage);
		List<Topic> retVal = query.getResultList();
		return retVal;
	}

}

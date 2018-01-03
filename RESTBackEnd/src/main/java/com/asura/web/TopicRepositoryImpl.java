package com.asura.web;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

public class TopicRepositoryImpl implements TopicRepositoryCustom{
	
	private final int topicsPerPage = 5;

	@PersistenceContext 
	private EntityManager em;
	
	@Override
	public List<Topic> getTopicByPageOrderByLastUpdated(int pageNumber) {
		TypedQuery<Topic> query = em.createNamedQuery("Topic.findOrderByLastUpdate", Topic.class);
		query.setFirstResult((topicsPerPage * pageNumber) - topicsPerPage);
		query.setMaxResults(topicsPerPage);
		List<Topic> retVal = query.getResultList();
		return retVal;
	}

}

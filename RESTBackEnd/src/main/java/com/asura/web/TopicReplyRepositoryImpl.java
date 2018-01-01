package com.asura.web;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

public class TopicReplyRepositoryImpl implements TopicReplyRepositoryCustom{
	
	@PersistenceContext 
	private EntityManager em;
	
	@Override
	public List<TopicReply> getTopicRepliesByTopicIds(long topicId, int pageNumber) {
		TypedQuery<TopicReply> query = em.createNamedQuery("TopicReply.findByTopicId", TopicReply.class);
		query.setParameter("id", topicId);
		List<TopicReply> retVal = query.getResultList();
		return retVal;
	}

}

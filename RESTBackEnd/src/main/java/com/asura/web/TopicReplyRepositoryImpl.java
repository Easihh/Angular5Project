package com.asura.web;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

public class TopicReplyRepositoryImpl implements TopicReplyRepositoryCustom{
	
	private final int topicsReplyPerPage = 5;
	
	@PersistenceContext 
	private EntityManager em;
	
	@Override
	public List<TopicReply> getPagedTopicRepliesByTopicId(long topicId, int pageNumber) {
		TypedQuery<TopicReply> query = em.createNamedQuery("TopicReply.findByTopicId", TopicReply.class);
		int startPosition = (topicsReplyPerPage * pageNumber) - topicsReplyPerPage;
		query.setParameter("id", topicId);
		query.setFirstResult(startPosition);
		query.setMaxResults(topicsReplyPerPage);
		List<TopicReply> retVal = query.getResultList();
		return retVal;
	}

	@Override
	public int getTotalTopicRepliesByTopicId(long topicId) {
		String sql = "Select count(*) from TOPIC_REPLIES tr where tr.topic_Id=:topicId";
		Query query = em.createNativeQuery(sql);
		query.setParameter("topicId", topicId);
		List<BigDecimal> resultList = query.getResultList();
		int total = resultList.get(0).intValue();
		return total;
	}

}

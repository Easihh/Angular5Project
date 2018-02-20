package com.asura.web.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.asura.web.entity.ArenaMatch;
import com.asura.web.entity.ArenaMatchStatus;
import com.asura.web.repository.custom.ArenaMatchRepositoryCustom;

public class ArenaMatchRepositoryImpl implements ArenaMatchRepositoryCustom{
	
	@PersistenceContext 
	private EntityManager em;
	
	@Override
	public ArenaMatch findByMatchId(String matchId) {
		TypedQuery<ArenaMatch> query = em.createNamedQuery("ArenaMatch.findByMatchId", ArenaMatch.class);
		query.setParameter("matchId", matchId);
		List<ArenaMatch> retVal = query.getResultList();
		return retVal.isEmpty()? null : retVal.get(0);
	}

	@Override
	public List<ArenaMatch> findAllByMatchStatus(ArenaMatchStatus mstatus) {
		TypedQuery<ArenaMatch> query = em.createNamedQuery("ArenaMatch.findAllByMatchStatus", ArenaMatch.class);
		query.setParameter("mstatus", mstatus);
		List<ArenaMatch> retVal = query.getResultList();
		return retVal;
	}

	@Override
	public ArenaMatch findActiveByBattlerId(Long battlerId) {
		TypedQuery<ArenaMatch> query = em.createNamedQuery("ArenaMatch.findActiveByBattlerId", ArenaMatch.class);
		query.setParameter("battlerId", battlerId);
		List<ArenaMatch> retVal = query.getResultList();
		return retVal.isEmpty()? null : retVal.get(0);
	}
}

package com.asura.web.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.asura.web.entity.ArenaBattle;
import com.asura.web.repository.custom.ArenaBattleRepositoryCustom;

public class ArenaBattleRepositoryImpl implements ArenaBattleRepositoryCustom{
	
	@PersistenceContext 
	private EntityManager em;
	
	@Override
	public List<ArenaBattle> findByArenaMatchId(long arenaMatchId) {
		TypedQuery<ArenaBattle> query = em.createNamedQuery("ArenaBattle.findByArenaMatchId", ArenaBattle.class);
		query.setParameter("matchId", arenaMatchId);
		List<ArenaBattle> retVal = query.getResultList();
		return retVal;
	}
}

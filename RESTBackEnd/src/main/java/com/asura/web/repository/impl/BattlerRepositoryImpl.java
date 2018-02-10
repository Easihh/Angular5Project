package com.asura.web.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.asura.web.entity.Battler;
import com.asura.web.repository.custom.BattlerRepositoryCustom;

public class BattlerRepositoryImpl implements BattlerRepositoryCustom{
	
	@PersistenceContext 
	private EntityManager em;
	
	@Override
	public Battler findByName(String battlerName) {
		TypedQuery<Battler> query = em.createNamedQuery("Battler.findByName", Battler.class);
		query.setParameter("name", battlerName);
		List<Battler> retVal = query.getResultList();
		return retVal.isEmpty() ? null : retVal.get(0);
	}
}

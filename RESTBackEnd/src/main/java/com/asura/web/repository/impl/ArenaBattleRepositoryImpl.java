package com.asura.web.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import com.asura.web.repository.custom.ArenaBattleRepositoryCustom;

public class ArenaBattleRepositoryImpl implements ArenaBattleRepositoryCustom{
	
	@PersistenceContext 
	private EntityManager em;
	
}

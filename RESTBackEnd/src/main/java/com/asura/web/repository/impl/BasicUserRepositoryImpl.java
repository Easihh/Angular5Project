package com.asura.web.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.asura.web.entity.BasicUser;
import com.asura.web.repository.custom.BasicUserRepositoryCustom;

public class BasicUserRepositoryImpl implements BasicUserRepositoryCustom{
		
	@PersistenceContext 
	private EntityManager em;

	@Override
	public BasicUser findByUsername(String name) {
		TypedQuery<BasicUser> user = em.createNamedQuery("BasicUser.findByUsername", BasicUser.class);
		user.setParameter("name", name);
		List<BasicUser> userList = user.getResultList();

		return userList.size() == 0 ? null : userList.get(0);
	}
}

package com.asura.web.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.asura.web.entity.ApplicationUser;
import com.asura.web.repository.custom.ApplicationUserRepositoryCustom;

public class ApplicationUserRepositoryImpl implements ApplicationUserRepositoryCustom{
		
	@PersistenceContext 
	private EntityManager em;

	@Override
	public ApplicationUser findByUsername(String name) {
		TypedQuery<ApplicationUser> user = em.createNamedQuery("ApplicationUser.findByUsername", ApplicationUser.class);
		user.setParameter("name", name);
		List<ApplicationUser> userList = user.getResultList();

		return userList.size() == 0 ? null : userList.get(0);
	}
}

package com.asura.web;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.ApplicationUser;

public interface ApplicationUserRepository extends CrudRepository<ApplicationUser, Long>, ApplicationUserRepositoryCustom{
	
}

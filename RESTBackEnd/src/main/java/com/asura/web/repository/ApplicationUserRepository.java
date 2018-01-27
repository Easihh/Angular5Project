package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.ApplicationUser;
import com.asura.web.repository.custom.ApplicationUserRepositoryCustom;

public interface ApplicationUserRepository extends CrudRepository<ApplicationUser, Long>, ApplicationUserRepositoryCustom{
	
}

package com.asura.web;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.ApplicationUser;

public interface UserRepository extends CrudRepository<ApplicationUser, Long>, UserRepositoryCustom{
	
}

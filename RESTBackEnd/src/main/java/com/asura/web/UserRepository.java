package com.asura.web;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.ApplicationUser;
import com.asura.web.entity.BasicUser;

public interface UserRepository extends CrudRepository<BasicUser, Long>, UserRepositoryCustom{
	
}

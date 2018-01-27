package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.BasicUser;
import com.asura.web.repository.custom.BasicUserRepositoryCustom;

public interface BasicUserRepository extends CrudRepository<BasicUser, Long>, BasicUserRepositoryCustom{
	
}

package com.asura.web;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.BasicUser;

public interface BasicUserRepository extends CrudRepository<BasicUser, Long>, BasicUserRepositoryCustom{
	
}

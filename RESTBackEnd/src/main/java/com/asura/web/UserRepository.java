package com.asura.web;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<ApplicationUser, Long>, UserRepositoryCustom{
	
}

package com.asura.web;

import com.asura.web.entity.ApplicationUser;

public interface UserRepositoryCustom{
	
	ApplicationUser findByUsername(String name);
}

package com.asura.web;

import com.asura.web.entity.ApplicationUser;

public interface ApplicationUserRepositoryCustom{
	
	ApplicationUser findByUsername(String name);
}

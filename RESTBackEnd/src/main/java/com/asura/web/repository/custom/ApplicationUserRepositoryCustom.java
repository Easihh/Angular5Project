package com.asura.web.repository.custom;

import com.asura.web.entity.ApplicationUser;

public interface ApplicationUserRepositoryCustom{
	
	ApplicationUser findByUsername(String name);
}

package com.asura.web.repository.custom;

import com.asura.web.entity.BasicUser;

public interface BasicUserRepositoryCustom{
	
	BasicUser findByUsername(String name);
}

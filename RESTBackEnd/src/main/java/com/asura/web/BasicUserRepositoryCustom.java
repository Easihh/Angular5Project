package com.asura.web;

import com.asura.web.entity.BasicUser;

public interface BasicUserRepositoryCustom{
	
	BasicUser findByUsername(String name);
}

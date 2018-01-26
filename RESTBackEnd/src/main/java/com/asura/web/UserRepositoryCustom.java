package com.asura.web;

import com.asura.web.entity.BasicUser;

public interface UserRepositoryCustom{
	
	BasicUser findByUsername(String name);
}

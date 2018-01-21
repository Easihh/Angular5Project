package com.asura.web.entity;

public enum UserRole {
	ADMIN(1l),
	USER(2l);
	
	private long id;
	
	UserRole(long roleId) {
		this.id=roleId;
	}
	
	public long getId() {
		return this.id;
	}
}

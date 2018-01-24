package com.asura.web.entity;

public enum FORUM_TYPE {
	GENERAL(7777l), OFF_TOPIC(9999l);

	private long id;

	FORUM_TYPE(long roleId) {
		this.id = roleId;
	}

	public long getId() {
		return this.id;
	}
}

package com.asura.web.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Roles")
public class Role {
	
	@Id
	@Column(name="ID")
	private Long id;
	
	@Column(name="ROLE_NAME")
	private String rolename;
	
	public Role() {}//default construct required

	public Role(UserRole user) {
		id = user.getId();
		rolename = user.name();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
}

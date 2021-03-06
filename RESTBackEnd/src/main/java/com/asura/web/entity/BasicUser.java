package com.asura.web.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/** Used to Create users only as we don't want to expose password and other info such as ids when returning topic's user info for example.*/

@Entity
@Table(name = "DB_USERS")
@NamedQueries({
	@NamedQuery(name="BasicUser.findByUsername",query="select t from BasicUser t where t.username=:name")
})
public class BasicUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DBUSERS_SEQ")
	@SequenceGenerator(name = "DBUSERS_SEQ", sequenceName = "DBUSERS_SEQ", allocationSize = 1)
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	private String username;
	
	@Column(name="PASSWORD")
	private String password;
	
	@OneToOne
	@JoinColumn(name="ROLE_ID", referencedColumnName="ID")
	private Role role;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
}

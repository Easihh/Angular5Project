package com.asura.web;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "DB_USERS")
@NamedQueries({
	@NamedQuery(name="ApplicationUser.findByUsername",query="select t from ApplicationUser t where t.username=:name")
})
public class ApplicationUser {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DBUSERS_SEQ")
	@SequenceGenerator(name = "DBUSERS_SEQ", sequenceName = "DBUSERS_SEQ", allocationSize = 1)
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	private String username;
	
	@Column(name="PASSWORD")
	private String password;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
